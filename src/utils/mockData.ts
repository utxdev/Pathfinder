import { Roadmap } from '../types/roadmap';


const GEMINI_API_KEY = 'AIzaSyB57aNN_8kpJ-IDZPuBqly4ggJa1agx3qc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function generateMockRoadmap(
  topic: string,
  level: string = 'Beginner', 
  goal : string = 'as recomended by your own'
): Promise<Roadmap | null> {
  console.log(`Generating ${level} roadmap for ${topic}...`);

  const systemPrompt = `You are an expert curriculum designer and learning path generator.
Your task is to create a comprehensive, detailed, and low-level learning roadmap.
- The roadmap must be practical and actionable.
- All resource URLs you provide must be valid, publicly accessible, and high-quality (e.g., official documentation, reputable platforms like YouTube, freeCodeCamp, MDN, etc.). Do not use "example.com" or placeholders.
- Generate unique IDs for all items (e.g., 'res_xyz', 'roadmap_xyz').
- Each item in the 'resources' array must be an object containing: id (string), title (string), type ('video', 'article', 'course', etc.), source (string), url (string), duration (string), and recommended (boolean).
- 'estimated_total_time_hours' should be the sum of all 'estimated_time_hours' in the steps.
- Populate all fields requested in the JSON schema.
- The 'completed' field for all steps must be 'false'.
- 'generated_by' should be 'gemini-2.5-flash'.
- 'version' should be 1.
- 'created_at' must be the current ISO 8601 timestamp.
- 'id' should be in the format 'roadmap_${Date.now()}'.
- 'title' should be in the format '${topic} — ${level} Roadmap'.
`;
  const userQuery = `Generate a detailed, low-level roadmap for learning ${topic} at the ${level} level with a maximum time limit of ${goal}. Ensure all steps and resources are appropriate for this level.`;
  
  const payload = {
    contents: [{
      parts: [{ text: userQuery }],
    }],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      responseMimeType: 'application/json',
      responseJsonSchema: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          title: { type: 'STRING' },
          topic: { type: 'STRING', description: `The topic provided: ${topic}` },
          summary: { type: 'STRING' },
          estimated_total_time_hours: { type: 'NUMBER' },
          difficulty: {
            type: 'STRING',
            enum: ['Beginner', 'Intermediate', 'Advanced'],
          },
          tags: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          steps: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                step_number: { type: 'NUMBER' },
                title: { type: 'STRING' },
                description: { type: 'STRING' },
                estimated_time_hours: { type: 'NUMBER' },
                difficulty: {
                  type: 'STRING',
                  enum: ['Easy', 'Medium', 'Hard'],
                },
                resources: {
                  type: 'ARRAY',
                  description: "An array of resource objects. Each object must contain: id, title, type, source, url, duration, and recommended.",
                },
                completed: { type: 'BOOLEAN' },
              },
              required: [
                'step_number',
                'title',
                'description',
                'estimated_time_hours',
                'difficulty',
                'resources',
                'completed',
              ],
            },
          },
          created_at: { type: 'STRING', format: 'date-time' },
          generated_by: { type: 'STRING' },
          version: { type: 'NUMBER' },
        },
        required: [
          'id',
          'title',
          'topic',
          'summary',
          'estimated_total_time_hours',
          'difficulty',
          'tags',
          'steps',
          'created_at',
          'generated_by',
          'version',
        ],
      },
    },
  };

  const MAX_RETRIES = 3;
  let attempt = 0;
  let delay = 1000;

  while (attempt < MAX_RETRIES) {
    attempt++;
    console.log(`API Call: Attempt ${attempt}...`);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        if (
          !result.candidates ||
          !result.candidates[0].content ||
          !result.candidates[0].content.parts ||
          !result.candidates[0].content.parts[0].text
        ) {
          console.error('Invalid API response structure:', result);
          throw new Error('Invalid response structure from Gemini API.');
        }
        const roadmapJsonString = result.candidates[0].content.parts[0].text;
        const roadmap: Roadmap = JSON.parse(roadmapJsonString);
        return roadmap;
      }
      if (response.status === 503) {
        console.warn(`API Error: ${response.status}. Model overloaded.`);
        if (attempt >= MAX_RETRIES) {
          console.error('Max retries reached. Giving up.');
          throw new Error('Model is overloaded. Please try again later.');
        }
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await sleep(delay);
        delay *= 2;
      } else {
        const errorBody = await response.text();
        console.error('API Error Response:', errorBody);
        throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt >= MAX_RETRIES) {
        throw error;
      }
      if (!(error instanceof Error && error.message.includes('API request failed'))) {
        await sleep(delay);
        delay *= 2;
      } else {
        break;
      }
    }
  }

  console.error('Failed to generate roadmap after all retries.');
  return null;
}