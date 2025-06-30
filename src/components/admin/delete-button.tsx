'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { AlertDialogAction } from '@/components/ui/alert-dialog'

export function DeleteButton({ children = "Delete" }: { children?: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <AlertDialogAction asChild>
            <Button type="submit" variant="destructive" disabled={pending}>
                {pending ? 'Deleting...' : children}
            </Button>
        </AlertDialogAction>
    )
}
