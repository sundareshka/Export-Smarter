import { SlideItem, PRESENTATION_METADATA } from '../data/presentationData';

export interface CreatePresentationResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
}

export interface ProgressCallback {
  (step: string, percentage: number): void;
}

// Convert RGB 0-255 to 0.0-1.0
const rgb = (r: number, g: number, b: number) => ({
  red: r / 255,
  green: g / 255,
  blue: b / 255,
});

const THEME = {
  emeraldPrimary: rgb(22, 78, 61), // #164E3D
  emeraldDark: rgb(15, 52, 41), // #0F3429
  goldAccent: rgb(217, 119, 6), // #D97706
  slateDark: rgb(15, 23, 42), // #0F172A
  slateMuted: rgb(100, 116, 139), // #64748B
  bgLight: rgb(248, 250, 252), // #F8FAFC
  white: rgb(255, 255, 255),
  cardBg: rgb(241, 245, 249),
  borderMuted: rgb(226, 232, 240),
};

export async function createGoogleSlidesPresentation(
  slides: SlideItem[],
  accessToken: string,
  onProgress?: ProgressCallback
): Promise<CreatePresentationResult> {
  if (!accessToken) {
    throw new Error('Access token is missing. Please sign in with Google first.');
  }

  onProgress?.('Initializing Google Slides presentation...', 10);

  // 1. Create a blank presentation
  const title = `${PRESENTATION_METADATA.title} - Exporter Masterclass`;
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (!createRes.ok) {
    const errorBody = await createRes.text();
    let parsedMessage = errorBody;
    try {
      const errJson = JSON.parse(errorBody);
      parsedMessage = errJson.error?.message || errorBody;
    } catch {
      // keep raw
    }
    throw new Error(`Failed to create presentation: ${parsedMessage}`);
  }

  const createdData = await createRes.json();
  const presentationId: string = createdData.presentationId;
  const initialSlideId = createdData.slides?.[0]?.objectId;

  onProgress?.('Presentation created in Google Drive. Generating slides...', 25);

  // We will build slides in chunks of 5 to provide smooth progress and stay well under request limits
  const chunkSize = 5;
  const totalSlides = slides.length;

  for (let i = 0; i < totalSlides; i += chunkSize) {
    const chunk = slides.slice(i, i + chunkSize);
    const requests: any[] = [];

    chunk.forEach((slide, chunkIdx) => {
      const absoluteIdx = i + chunkIdx;
      const slideObjectId = `slide_exp_${absoluteIdx + 1}_${Date.now()}`;

      // 1. Create Slide
      requests.push({
        createSlide: {
          objectId: slideObjectId,
          insertionIndex: absoluteIdx,
          slideLayoutAndPages: {
            predefinedLayout: 'BLANK',
          },
        },
      });

      // Background accent bar at the top (Emerald banner)
      const topBarId = `topbar_${slideObjectId}`;
      requests.push({
        createShape: {
          objectId: topBarId,
          shapeType: 'RECTANGLE',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 720, unit: 'PT' },
              height: { magnitude: 10, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 0,
              translateY: 0,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        updateShapeProperties: {
          objectId: topBarId,
          shapeProperties: {
            shapeBackgroundFill: {
              solidFill: { color: { rgbColor: THEME.goldAccent } },
            },
            outline: { propertyState: 'NOT_RENDERED' },
          },
          fields: 'shapeBackgroundFill,outline',
        },
      });

      // Category Pill / Header Tag
      const tagId = `tag_${slideObjectId}`;
      const tagText = `${slide.category.toUpperCase()} • ${slide.timeSlot || 'MASTERCLASS MODULE'}`;
      requests.push({
        createShape: {
          objectId: tagId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 400, unit: 'PT' },
              height: { magnitude: 24, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 20,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        insertText: {
          objectId: tagId,
          insertionIndex: 0,
          text: tagText,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: tagId,
          style: {
            fontSize: { magnitude: 9, unit: 'PT' },
            bold: true,
            foregroundColor: { solidFill: { color: { rgbColor: THEME.goldAccent } } },
            fontFamily: 'Roboto',
          },
          fields: 'fontSize,bold,foregroundColor,fontFamily',
        },
      });

      // Slide Title
      const titleId = `title_${slideObjectId}`;
      requests.push({
        createShape: {
          objectId: titleId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 640, unit: 'PT' },
              height: { magnitude: 38, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 42,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        insertText: {
          objectId: titleId,
          insertionIndex: 0,
          text: slide.title,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: titleId,
          style: {
            fontSize: { magnitude: 18, unit: 'PT' },
            bold: true,
            foregroundColor: { solidFill: { color: { rgbColor: THEME.emeraldPrimary } } },
            fontFamily: 'Arial',
          },
          fields: 'fontSize,bold,foregroundColor,fontFamily',
        },
      });

      // Subtitle / Why It Matters
      const subId = `sub_${slideObjectId}`;
      const subtitleText = slide.subtitle;
      requests.push({
        createShape: {
          objectId: subId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 640, unit: 'PT' },
              height: { magnitude: 26, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 82,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        insertText: {
          objectId: subId,
          insertionIndex: 0,
          text: subtitleText,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: subId,
          style: {
            fontSize: { magnitude: 11, unit: 'PT' },
            italic: true,
            foregroundColor: { solidFill: { color: { rgbColor: THEME.slateMuted } } },
            fontFamily: 'Arial',
          },
          fields: 'fontSize,italic,foregroundColor,fontFamily',
        },
      });

      // Left Column / Main Action Steps Body
      const bodyId = `body_${slideObjectId}`;
      const stepsFormatted = slide.howToDoIt.map((step) => `• ${step}`).join('\n');
      const toolHeader = slide.recommendedTool ? `Recommended Tool: ${slide.recommendedTool}\n\n` : '';
      const fullBodyText = `${toolHeader}Action Steps:\n${stepsFormatted}`;

      requests.push({
        createShape: {
          objectId: bodyId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 330, unit: 'PT' },
              height: { magnitude: 230, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 118,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        insertText: {
          objectId: bodyId,
          insertionIndex: 0,
          text: fullBodyText,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: bodyId,
          style: {
            fontSize: { magnitude: 10, unit: 'PT' },
            foregroundColor: { solidFill: { color: { rgbColor: THEME.slateDark } } },
            fontFamily: 'Arial',
          },
          fields: 'fontSize,foregroundColor,fontFamily',
        },
      });

      // Right Column: Sample Prompt or Key Takeaways / Rules Card
      const cardBoxId = `card_${slideObjectId}`;
      let rightColumnText = '';

      if (slide.id === 'slide-speaker-profile') {
        rightColumnText = `SPEAKER PROFILE & DIGITAL HUB:\n\nSundaresh Kamaraj\nFounder & CEO, Elysium Group of Companies (Madurai)\n• Founded Elysium Technologies in 1999 (25+ years in IT industry)\n• Background: Electronics & Communication Engineering & IT\n• Contributions: IT Education, Software Dev, Skill Training & Entrepreneurship\n• Vision: Empowering young people through technology, innovation and education\n\nOFFICIAL BLOG & RESOURCES:\nhttps://sundaresh.blog\n\nDIRECT EMAIL:\nka.sundaresh@gmail.com`;
      } else if (slide.prompts && slide.prompts.length > 0) {
        const p = slide.prompts[0];
        rightColumnText = `READY-TO-USE PROMPT TEMPLATE:\n[${p.title}]\n\n"${p.text.slice(0, 420)}${p.text.length > 420 ? '...' : ''}"`;
        if (slide.importantRule) {
          rightColumnText += `\n\nCRITICAL RULE: ${slide.importantRule}`;
        }
      } else if (slide.tableData) {
        const tableSample = slide.tableData.rows
          .slice(0, 4)
          .map((r) => r.join(' | '))
          .join('\n');
        rightColumnText = `KEY FRAMEWORK MATRIX:\n\n${slide.tableData.headers.join(' | ')}\n---\n${tableSample}`;
        if (slide.importantRule) {
          rightColumnText += `\n\nCRITICAL RULE: ${slide.importantRule}`;
        }
      } else {
        rightColumnText = `KEY TAKEAWAYS:\n\n${slide.keyTakeaways.map((t) => `✓ ${t}`).join('\n\n')}`;
      }

      requests.push({
        createShape: {
          objectId: cardBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 300, unit: 'PT' },
              height: { magnitude: 230, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 380,
              translateY: 118,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        updateShapeProperties: {
          objectId: cardBoxId,
          shapeProperties: {
            shapeBackgroundFill: {
              solidFill: { color: { rgbColor: THEME.cardBg } },
            },
            outline: {
              outlineFill: { solidFill: { color: { rgbColor: THEME.borderMuted } } },
              weight: { magnitude: 1, unit: 'PT' },
            },
          },
          fields: 'shapeBackgroundFill,outline',
        },
      });
      requests.push({
        insertText: {
          objectId: cardBoxId,
          insertionIndex: 0,
          text: rightColumnText,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: cardBoxId,
          style: {
            fontSize: { magnitude: 9.5, unit: 'PT' },
            foregroundColor: { solidFill: { color: { rgbColor: THEME.emeraldDark } } },
            fontFamily: 'Arial',
          },
          fields: 'fontSize,foregroundColor,fontFamily',
        },
      });

      // Footer bar: Exporter credits & slide number
      const footerId = `footer_${slideObjectId}`;
      requests.push({
        createShape: {
          objectId: footerId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideObjectId,
            size: {
              width: { magnitude: 640, unit: 'PT' },
              height: { magnitude: 20, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 375,
              unit: 'PT',
            },
          },
        },
      });
      requests.push({
        insertText: {
          objectId: footerId,
          insertionIndex: 0,
          text: `Sundaresh Kamaraj, Founder & CEO, Elysium Groups | You Export, Madurai | Slide ${slide.slideNumber} of ${totalSlides}`,
        },
      });
      requests.push({
        updateTextStyle: {
          objectId: footerId,
          style: {
            fontSize: { magnitude: 8, unit: 'PT' },
            foregroundColor: { solidFill: { color: { rgbColor: THEME.slateMuted } } },
            fontFamily: 'Arial',
          },
          fields: 'fontSize,foregroundColor,fontFamily',
        },
      });
    });

    const currentPercent = Math.min(90, Math.round(25 + ((i + chunk.length) / totalSlides) * 65));
    onProgress?.(`Building slides ${i + 1} to ${Math.min(i + chunk.length, totalSlides)} of ${totalSlides}...`, currentPercent);

    const updateRes = await fetch(
      `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      let msg = errText;
      try {
        const errJson = JSON.parse(errText);
        msg = errJson.error?.message || errText;
      } catch {
        // fallback
      }
      throw new Error(`Failed to generate slide batch: ${msg}`);
    }
  }

  // If there was an empty default slide created initially, delete it cleanly
  if (initialSlideId) {
    try {
      await fetch(
        `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                deleteObject: {
                  objectId: initialSlideId,
                },
              },
            ],
          }),
        }
      );
    } catch (ignore) {
      // Deleting initial slide is a minor cosmetic cleanup, ignore if not allowed
    }
  }

  onProgress?.('Presentation generated successfully!', 100);

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
    title,
  };
}
