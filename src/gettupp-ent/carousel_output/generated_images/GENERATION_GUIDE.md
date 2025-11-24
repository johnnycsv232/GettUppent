# Batch AI Image Generation Guide

## Using DALL-E (OpenAI)

1. Open ChatGPT or OpenAI API
2. Use the prompts from `ai_generation_prompts.txt`
3. For each prompt, specify:
   - Dimensions: 1080x1350 (vertical)
   - Style: Professional, modern, minimalist
   - Format: PNG or JPEG

## Using Midjourney

1. Open Midjourney Discord
2. Use command: `/imagine`
3. Paste prompt + add parameters:
   ```
   [PROMPT] --ar 4:5 --style raw --v 6
   ```
4. Download and rename to match output filename

## Using Canva AI

1. Create new design: 1080×1350px
2. Use "Text to Image" feature
3. Paste prompts from the text file
4. Adjust with design specifications from JSON

## Bulk Processing Tips

- Process one carousel at a time (5-6 slides each)
- Keep consistent style across all slides
- Use the HTML mockups as reference
- Verify brand colors: Gold #D9AE43, Pink #FF3C93, Ink #0B0B0D

## File Naming Convention

Save generated images as:
- `carousel_1_who_problem_brand_slide_1.png`
- `carousel_1_who_problem_brand_slide_2.png`
- etc.

Place all generated images in: `carousel_output/generated_images/`
