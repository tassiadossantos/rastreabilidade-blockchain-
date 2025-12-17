import { VerificationBadge } from "../VerificationBadge";

export default function VerificationBadgeExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <VerificationBadge status="verified" />
      <VerificationBadge status="pending" />
      <VerificationBadge status="failed" />
      <VerificationBadge status="not_synced" />
    </div>
  );
}
