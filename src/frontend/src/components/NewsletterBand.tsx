import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscribeEmail } from "../hooks/useQueries";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribe.mutateAsync(email);
      toast.success("Subscribed! Welcome to SKR Haven.");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="bg-nav-strip py-14 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-3xl">📬</span>
        <h2 className="text-2xl font-bold text-foreground mt-3 mb-2">
          Stay in the Loop
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Get weekly deals, new arrivals, and exclusive offers delivered right
          to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full bg-header border-border"
            required
            data-ocid="newsletter.input"
          />
          <Button
            type="submit"
            disabled={subscribe.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold"
            data-ocid="newsletter.submit_button"
          >
            {subscribe.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Subscribing…
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
