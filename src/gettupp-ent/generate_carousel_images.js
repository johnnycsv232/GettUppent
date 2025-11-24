/**
 * Carousel Image Generator
 * Purpose: Generate actual carousel images from JSON specifications
 * 
 * This script reads the JSON slide specifications and creates visual mockups
 * using HTML Canvas or by preparing prompts for external AI generation.
 */

const fs = require('fs');
const path = require('path');

class CarouselImageGenerator {
    constructor() {
        this.outputDir = path.join(__dirname, 'carousel_output');
        this.imagesDir = path.join(this.outputDir, 'generated_images');
        this.ensureImageDir();

        // Brand colors
        this.colors = {
            gold: '#D9AE43',
            pink: '#FF3C93',
            ink: '#0B0B0D'
        };
    }

    ensureImageDir() {
        if (!fs.existsSync(this.imagesDir)) {
            fs.mkdirSync(this.imagesDir, { recursive: true });
        }
    }

    /**
     * Generate AI prompts file for batch generation
     */
    generateAIPromptsFile() {
        console.log('📝 Generating AI image prompts file...\n');

        const carousels = [
            'carousel_1_who_problem_brand',
            'carousel_2_packages_system',
            'carousel_3_proof_cta'
        ];

        const allPrompts = [];
        let slideCounter = 1;

        carousels.forEach(carouselName => {
            const carouselDir = path.join(this.outputDir, carouselName);

            if (!fs.existsSync(carouselDir)) {
                console.log(`⚠️  Carousel directory not found: ${carouselName}`);
                return;
            }

            // Read all slide JSON files
            const files = fs.readdirSync(carouselDir)
                .filter(f => f.startsWith('slide_') && f.endsWith('.json'))
                .sort();

            files.forEach(file => {
                const filepath = path.join(carouselDir, file);
                const slide = JSON.parse(fs.readFileSync(filepath, 'utf8'));

                allPrompts.push({
                    slideId: slideCounter++,
                    carousel: carouselName,
                    slideNumber: slide.slideNumber,
                    purpose: slide.purpose,
                    outputFilename: `${carouselName}_slide_${slide.slideNumber}.png`,
                    prompt: slide.imagePrompt,
                    designSpecs: {
                        dimensions: slide.dimensions,
                        background: slide.design.background,
                        primaryColor: this.extractPrimaryColor(slide),
                        fonts: slide.design.fonts
                    }
                });
            });
        });

        // Export as JSON
        const jsonPath = path.join(this.imagesDir, 'ai_generation_prompts.json');
        fs.writeFileSync(jsonPath, JSON.stringify(allPrompts, null, 2));
        console.log(`✅ Generated prompts file: ${jsonPath}`);
        console.log(`   Total prompts: ${allPrompts.length}\n`);

        // Export as text file for easy copy-paste
        const txtPath = path.join(this.imagesDir, 'ai_generation_prompts.txt');
        let txtContent = '# GettUpp ENT Carousel Image Generation Prompts\n\n';
        txtContent += 'Copy each prompt below and use with DALL-E, Midjourney, or similar AI image generators.\n';
        txtContent += 'Dimensions: 1080x1350px (Instagram carousel format)\n\n';
        txtContent += '='.repeat(80) + '\n\n';

        allPrompts.forEach((item, index) => {
            txtContent += `SLIDE ${item.slideId}: ${item.carousel} - Slide ${item.slideNumber}\n`;
            txtContent += `Purpose: ${item.purpose}\n`;
            txtContent += `Output: ${item.outputFilename}\n`;
            txtContent += `\nPROMPT:\n${item.prompt}\n`;
            txtContent += `\nDESIGN NOTES:\n`;
            txtContent += `- Background: ${item.designSpecs.background}\n`;
            txtContent += `- Dimensions: ${item.designSpecs.dimensions}\n`;
            txtContent += '\n' + '='.repeat(80) + '\n\n';
        });

        fs.writeFileSync(txtPath, txtContent);
        console.log(`✅ Generated text prompts: ${txtPath}`);
        console.log(`   Ready for copy-paste to AI image generators\n`);

        return allPrompts;
    }

    /**
     * Generate HTML mockups for preview
     */
    generateHTMLMockups() {
        console.log('🎨 Generating HTML mockups...\n');

        const carousels = [
            { name: 'carousel_1_who_problem_brand', title: 'Who/Problem/Brand' },
            { name: 'carousel_2_packages_system', title: 'Packages/System' },
            { name: 'carousel_3_proof_cta', title: 'Proof/CTA/FAQ' }
        ];

        carousels.forEach(carousel => {
            const carouselDir = path.join(this.outputDir, carousel.name);

            if (!fs.existsSync(carouselDir)) {
                console.log(`⚠️  Carousel directory not found: ${carousel.name}`);
                return;
            }

            // Read all slides
            const files = fs.readdirSync(carouselDir)
                .filter(f => f.startsWith('slide_') && f.endsWith('.json'))
                .sort();

            const slides = files.map(file => {
                const filepath = path.join(carouselDir, file);
                return JSON.parse(fs.readFileSync(filepath, 'utf8'));
            });

            // Generate HTML
            const html = this.createCarouselHTML(carousel.title, slides);
            const htmlPath = path.join(this.imagesDir, `${carousel.name}_mockup.html`);
            fs.writeFileSync(htmlPath, html);
            console.log(`✅ Generated HTML mockup: ${htmlPath}`);
        });

        console.log('\n📱 Open the HTML files in a browser to preview carousel designs\n');
    }

    createCarouselHTML(carouselTitle, slides) {
        const slideHTML = slides.map(slide => {
            const content = this.formatSlideContent(slide);

            return `
                <div class="slide" data-slide="${slide.slideNumber}">
                    <div class="slide-header">
                        <div class="logo">GE</div>
                        <div class="slide-count">${slide.slideNumber}/${slides.length}</div>
                    </div>
                    <div class="slide-content">
                        ${content}
                    </div>
                    <div class="slide-footer">
                        <div class="purpose">${slide.purpose}</div>
                    </div>
                </div>
            `;
        }).join('');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${carouselTitle} - GettUpp ENT Carousel Mockup</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #1a1a1a;
            color: white;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 36px;
            font-weight: 800;
            color: ${this.colors.gold};
            margin-bottom: 10px;
            text-align: center;
        }
        
        .subtitle {
            text-align: center;
            color: #999;
            margin-bottom: 40px;
            font-size: 18px;
        }
        
        .carousel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .slide {
            background: ${this.colors.ink};
            border: 2px solid #333;
            border-radius: 12px;
            overflow: hidden;
            aspect-ratio: 1080/1350;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .slide:hover {
            transform: translateY(-5px);
            border-color: ${this.colors.gold};
        }
        
        .slide-header {
            background: rgba(0, 0, 0, 0.5);
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #333;
        }
        
        .logo {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            font-size: 20px;
            background: linear-gradient(135deg, ${this.colors.gold}, ${this.colors.pink});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .slide-count {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            font-size: 14px;
            color: white;
        }
        
        .slide-content {
            flex: 1;
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: auto;
        }
        
        .slide-footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 12px 20px;
            border-top: 1px solid #333;
        }
        
        .purpose {
            font-size: 12px;
            color: #999;
            font-style: italic;
        }
        
        .headline {
            font-family: 'Montserrat', sans-serif;
            font-size: 28px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 15px;
        }
        
        .subtext {
            font-size: 16px;
            line-height: 1.4;
            color: #ccc;
            margin-bottom: 10px;
        }
        
        .gold { color: ${this.colors.gold}; }
        .pink { color: ${this.colors.pink}; }
        
        ul {
            list-style: none;
            margin: 15px 0;
        }
        
        li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            font-size: 14px;
            line-height: 1.4;
        }
        
        li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: ${this.colors.gold};
            font-weight: bold;
        }
        
        .cta {
            font-family: 'Montserrat', sans-serif;
            font-size: 32px;
            font-weight: 900;
            color: ${this.colors.gold};
            text-align: center;
            margin: 20px 0;
            text-transform: uppercase;
        }
        
        .instructions {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
            border-left: 4px solid ${this.colors.gold};
        }
        
        .instructions h3 {
            font-family: 'Montserrat', sans-serif;
            color: ${this.colors.gold};
            margin-bottom: 15px;
        }
        
        .instructions ol {
            list-style: decimal;
            margin-left: 20px;
        }
        
        .instructions li {
            padding: 5px 0;
            padding-left: 10px;
        }
        
        .instructions li:before {
            content: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${carouselTitle}</h1>
        <p class="subtitle">GettUpp ENT Instagram Carousel - Design Mockup</p>
        
        <div class="carousel-grid">
            ${slideHTML}
        </div>
        
        <div class="instructions">
            <h3>📝 Next Steps</h3>
            <ol>
                <li>Review the mockups above to understand the visual flow</li>
                <li>Use the AI generation prompts file to create actual images</li>
                <li>Or design manually in Figma/Canva using the JSON specifications</li>
                <li>Export final images as 1080×1350px JPEGs</li>
                <li>Upload to Instagram and pin to profile</li>
            </ol>
        </div>
    </div>
</body>
</html>
        `;
    }

    formatSlideContent(slide) {
        const content = slide.content;
        let html = '';

        // Handle different content structures
        if (content.headline) {
            const color = content.headline.toLowerCase().includes('pilot') ||
                content.headline.toLowerCase().includes('ready') ? 'gold' :
                content.headline.toLowerCase().includes('problem') ? 'pink' : 'gold';
            html += `<div class="headline ${color}">${content.headline}</div>`;
        }

        if (content.title) {
            html += `<div class="headline pink">${content.title}</div>`;
        }

        if (content.subtext) {
            html += `<div class="subtext">${content.subtext}</div>`;
        }

        if (content.subtitle) {
            html += `<div class="subtext">${content.subtitle}</div>`;
        }

        if (content.description) {
            html += `<div class="subtext">${content.description}</div>`;
        }

        if (content.bullets && Array.isArray(content.bullets)) {
            html += '<ul>';
            content.bullets.forEach(bullet => {
                html += `<li>${bullet}</li>`;
            });
            html += '</ul>';
        }

        if (content.cta) {
            html += `<div class="cta">${content.cta}</div>`;
        }

        if (content.instructions) {
            html += `<div class="subtext">${content.instructions}</div>`;
        }

        if (content.scarcity) {
            html += `<div class="subtext pink" style="margin-top: 15px; font-weight: 600;">${content.scarcity}</div>`;
        }

        return html || '<div class="subtext">Content preview not available</div>';
    }

    extractPrimaryColor(slide) {
        const design = JSON.stringify(slide.design);
        if (design.includes(this.colors.gold)) return 'gold';
        if (design.includes(this.colors.pink)) return 'pink';
        return 'ink';
    }

    /**
     * Generate a batch script for external AI generation
     */
    generateBatchScript() {
        console.log('🤖 Generating batch generation guide...\n');

        const guide = `# Batch AI Image Generation Guide

## Using DALL-E (OpenAI)

1. Open ChatGPT or OpenAI API
2. Use the prompts from \`ai_generation_prompts.txt\`
3. For each prompt, specify:
   - Dimensions: 1080x1350 (vertical)
   - Style: Professional, modern, minimalist
   - Format: PNG or JPEG

## Using Midjourney

1. Open Midjourney Discord
2. Use command: \`/imagine\`
3. Paste prompt + add parameters:
   \`\`\`
   [PROMPT] --ar 4:5 --style raw --v 6
   \`\`\`
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
- \`carousel_1_who_problem_brand_slide_1.png\`
- \`carousel_1_who_problem_brand_slide_2.png\`
- etc.

Place all generated images in: \`carousel_output/generated_images/\`
`;

        const guidePath = path.join(this.imagesDir, 'GENERATION_GUIDE.md');
        fs.writeFileSync(guidePath, guide);
        console.log(`✅ Generated batch guide: ${guidePath}\n`);
    }

    run() {
        console.log('🎨 Carousel Image Generator Started\n');
        console.log('='.repeat(60));
        console.log('Preparing carousel images for generation...\n');

        try {
            // Generate AI prompts file
            const prompts = this.generateAIPromptsFile();

            // Generate HTML mockups
            this.generateHTMLMockups();

            // Generate batch script guide
            this.generateBatchScript();

            console.log('='.repeat(60));
            console.log('✅ IMAGE GENERATION PREP COMPLETE\n');
            console.log(`📁 Output directory: ${this.imagesDir}`);
            console.log('\n📋 Files created:');
            console.log('   • ai_generation_prompts.json (structured data)');
            console.log('   • ai_generation_prompts.txt (copy-paste ready)');
            console.log('   • *_mockup.html (visual previews)');
            console.log('   • GENERATION_GUIDE.md (instructions)');
            console.log('\n🚀 Next Steps:');
            console.log('   1. Open HTML mockups in browser to preview');
            console.log('   2. Use prompts file with AI image generator');
            console.log('   3. Save generated images to generated_images/');
            console.log('='.repeat(60));

        } catch (error) {
            console.error('❌ Error:', error.message);
        }
    }
}

// Run if executed directly
if (require.main === module) {
    const generator = new CarouselImageGenerator();
    generator.run();
}

module.exports = CarouselImageGenerator;
