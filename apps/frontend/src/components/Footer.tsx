import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <footer className="border-t py-6 md:py-0">
                <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
                    <p className="text-sm text-muted-foreground">© 2025 Pesotable. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                        Terms
                        </Link>
                        <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                        Privacy
                        </Link>
                        <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                        Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer