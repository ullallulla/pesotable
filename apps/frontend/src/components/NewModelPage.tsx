import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import ModelUploadForm from "@/components/ModelUploadForm"

const NewModelPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/models">
                <ChevronLeft className="h-4 w-4" />
                Back to Models
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Model</h1>
          <p className="text-muted-foreground">Upload a new print model.</p>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <ModelUploadForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default NewModelPage