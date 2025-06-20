import { NextResponse } from "next/server";

    interface Props {
        title?: string;
        content?: string;
        description?: string;
        date?: Date;
    }

    export const validateInputs = ({title, content, description, date}: Props) => {
        if (title !== undefined && !title.trim()) return NextResponse.json({error: 'Title Required'}, {status: 400})
        if (title && title.length > 50) return NextResponse.json({error: 'Title Too Long'}, {status: 400})

        if (date !== undefined) {
            const dateObj = new Date(date)
            if (isNaN(dateObj.getTime())) {
                return NextResponse.json({error: 'Invalid date format'}, {status: 400})
            }
        }
        
        if (content !== undefined && !content.trim()) return NextResponse.json({error: 'Content Required'}, {status: 400})
        if (content && content.length > 250) return NextResponse.json({error: 'Content Too Long'}, {status: 400})

        if (description !== undefined && !description?.trim()) return NextResponse.json({error: 'Description Required'}, {status: 400})
        if (description && description.length > 500) return NextResponse.json({error: 'Description Too Long'}, {status: 400})

        return null
    }
    