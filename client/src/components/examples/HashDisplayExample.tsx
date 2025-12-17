import { HashDisplay } from "../HashDisplay";

export default function HashDisplayExample() {
  return (
    <div className="space-y-4">
      <HashDisplay 
        hash="0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
        label="Hash dos Dados"
        txHash="0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
      />
    </div>
  );
}
