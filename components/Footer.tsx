export default function Footer() {
  return (
    <footer className="py-12 border-t mt-20 bg-muted/30">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground font-medium">
          &copy; {new Date().getFullYear()} DevProfiles. Built with elegance by <span className="text-primary">Ahmad Alkadri</span>.
        </p>
      </div>
    </footer>
  );
}
