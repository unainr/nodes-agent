// features/workspaces/create-workspace-dialog.tsx
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { workspacesSchema } from "../../server/schema"
import { useCreateWorkspace } from "../../hooks/use-create-workspaces"
import { Spinner } from "@/components/ui/spinner"



export function CreateWorkspaceDialog() {
  const [open, setOpen] = React.useState(false)
  const {mutate,isPending}= useCreateWorkspace()
  const form = useForm({
    defaultValues: { name: "" },
    validators: { onSubmit: workspacesSchema },
     onSubmit:  ({ value }) => {
        mutate(value,{
        onSuccess:()=>{
            toast.success("workspace created successfully")
            setOpen(false)
            form.reset()
        }
      })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New workspace</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Give your workspace a name. You can change this later.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-workspace-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Workspace name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Acme Inc"
                      autoComplete="off"
                      autoFocus
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} form="create-workspace-form">
            {isPending ? <Spinner /> : "Save Workspace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}