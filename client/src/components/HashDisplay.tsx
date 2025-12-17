import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HashDisplayProps {
  hash: string;
  label?: string;
  txHash?: string;
  explorerUrl?: string;
  truncate?: boolean;
}

export function HashDisplay({ hash, label, txHash, explorerUrl, truncate = true }: HashDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayHash = truncate && hash.length > 16 
    ? `${hash.slice(0, 8)}...${hash.slice(-8)}` 
    : hash;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const polygonscanUrl = explorerUrl || (txHash ? `https://mumbai.polygonscan.com/tx/${txHash}` : null);

  return (
    <div className="space-y-1">
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <code 
          className="font-mono text-sm bg-muted px-2 py-1 rounded break-all"
          data-testid="text-hash-value"
        >
          {displayHash}
        </code>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-7 w-7"
              data-testid="button-copy-hash"
            >
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? "Copiado!" : "Copiar hash"}
          </TooltipContent>
        </Tooltip>
        {polygonscanUrl && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-7 w-7"
                data-testid="button-view-explorer"
              >
                <a href={polygonscanUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ver no Polygonscan</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
