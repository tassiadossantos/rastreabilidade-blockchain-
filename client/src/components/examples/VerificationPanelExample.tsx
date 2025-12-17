import { VerificationPanel } from "../VerificationPanel";

export default function VerificationPanelExample() {
  return (
    <VerificationPanel
      offChainHash="0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b"
      onChainHash="0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b"
      txHash="0x9b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c"
      lastVerified={new Date()}
    />
  );
}
