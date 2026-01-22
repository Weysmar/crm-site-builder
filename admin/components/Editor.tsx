"use client";

import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-blocks-basic';

interface EditorProps {
    pageId?: string; // Optional: if provided, load existing page
}

export default function Editor({ pageId }: EditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstance = useRef<any>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        editorInstance.current = grapesjs.init({
            container: editorRef.current,
            height: '100vh',
            width: '100%',
            // Configure Remote Storage
            storageManager: {
                type: 'remote',
                stepsBeforeSave: 10,
                urlStore: `http://localhost:3000/pages/${pageId || ''}/content`,
                urlLoad: `http://localhost:3000/pages/${pageId || ''}/content`,
                // Custom fetcher to handle params properly if needed, but standard remote works for simple JSON
            } as any,
            plugins: ['gjs-preset-webpage', 'gjs-blocks-basic'],
            pluginsOpts: {
                'gjs-blocks-basic': {},
                'gjs-preset-webpage': {
                    // Options for the preset
                },
            },
            blockManager: {
                blocks: [
                    {
                        id: 'hero-section',
                        label: 'Hero Section',
                        content: `
              <div class="hero-section" style="padding: 100px 20px; text-align: center; background-color: #f3f4f6;">
                <h1 style="font-size: 3rem; margin-bottom: 20px;">Welcome to My Portfolio</h1>
                <p style="font-size: 1.5rem; margin-bottom: 30px;">I am a creative professional.</p>
                <a href="#contact" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Contact Me</a>
              </div>
            `,
                    }
                ]
            },
        });

        // Add explicit Save Button
        editorInstance.current.Panels.addButton('options', {
            id: 'save-db',
            className: 'fa fa-floppy-o',
            command: 'save-db',
            attributes: { title: 'Save Page' },
        });

        editorInstance.current.Commands.add('save-db', {
            run: (editor: any, sender: any) => {
                sender && sender.set('active', 0); // Turn off the button
                editor.store();
                alert('Requesting Save...');
            },
        });

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
            }
        };
    }, [pageId]);

    return <div ref={editorRef} />;
}
