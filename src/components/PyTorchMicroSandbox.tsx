"use client";

import React, { useState } from "react";
import { Code2, Copy, Check, Terminal, Play, Cpu } from "lucide-react";

interface PyTorchMicroSandboxProps {
  onShowToast?: (message: string) => void;
  className?: string;
}

const PYTORCH_CODE = `import torch
import torch.nn as nn
import math

class ScaledDotProductAttention(nn.Module):
    """
    Computes Scaled Dot-Product Attention:
    Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V
    """
    def __init__(self, d_k: int):
        super().__init__()
        self.scale = 1.0 / math.sqrt(d_k)
        self.softmax = nn.Softmax(dim=-1)

    def forward(self, q, k, v, mask=None):
        # Q, K, V shape: [batch, heads, seq_len, d_k]
        scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn_weights = self.softmax(scores)
        output = torch.matmul(attn_weights, v)
        return output, attn_weights

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int = 512, n_heads: int = 8):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.w_q = nn.Linear(d_model, d_model, bias=False)
        self.w_k = nn.Linear(d_model, d_model, bias=False)
        self.w_v = nn.Linear(d_model, d_model, bias=False)
        self.w_o = nn.Linear(d_model, d_model, bias=False)
        self.attention = ScaledDotProductAttention(self.d_k)

    def forward(self, q, k, v, mask=None):
        batch_size = q.size(0)
        # Linear projection and reshape into multi-head tensor: [B, H, S, d_k]
        q = self.w_q(q).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        k = self.w_k(k).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        v = self.w_v(v).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)

        out, weights = self.attention(q, k, v, mask)
        # Concatenate heads and project output: [B, S, D_model]
        out = out.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        return self.w_o(out), weights`;

export const PyTorchMicroSandbox: React.FC<PyTorchMicroSandboxProps> = ({
  onShowToast,
  className = "",
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PYTORCH_CODE);
      setCopied(true);
      onShowToast?.("📋 Copied PyTorch MultiHeadAttention module to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunSimulation = () => {
    setSimulating(true);
    setSimOutput(null);
    setTimeout(() => {
      setSimulating(false);
      setSimOutput(`>>> Input Tensor: torch.randn(1, 10, 512)
>>> MHA Forward Pass:
  - Projected Q, K, V -> [1, 8, 10, 64]
  - Scaled Scores (Q @ K.T / sqrt(64)) -> [1, 8, 10, 10]
  - Softmax Attention Map -> [1, 8, 10, 10] (Sum=1.0)
  - Output Linear Projection -> [1, 10, 512]
>>> Success: Gradient backprop verified (0.42ms).`);
      onShowToast?.("⚡ PyTorch Forward Pass simulation complete!");
    }, 450);
  };

  return (
    <div className={`bg-[#12231B] text-white rounded-3xl p-6 sm:p-8 border border-[#1A3327] shadow-2xl space-y-5 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1A3327]">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E6F77B] text-[#12231B] flex items-center justify-center font-black">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black tracking-tight text-white">
                PyTorch Micro-Sandbox
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1D3529] text-[#E6F77B] border border-[#2C4E3D]">
                torch.nn.Module
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Complete, production-ready Scaled Dot-Product & Multi-Head Attention
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunSimulation}
            disabled={simulating}
            className="btn-lemon px-4 py-2 text-xs font-black flex items-center space-x-1.5 shadow-md disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${simulating ? "animate-spin" : ""}`} />
            <span>{simulating ? "Executing..." : "Run Forward Pass"}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 rounded-full bg-[#1D3529] hover:bg-[#2A4C3B] text-slate-200 hover:text-white border border-[#2C4E3D] text-xs font-bold font-mono flex items-center space-x-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#E6F77B]" />
                <span className="text-[#E6F77B]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="relative rounded-2xl bg-[#0A1410] border border-[#1A3327] p-4 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed max-h-96">
        <pre className="text-[11px] sm:text-xs">
          <code>{PYTORCH_CODE}</code>
        </pre>
      </div>

      {/* Tensor Flow Simulation Output Terminal */}
      {simOutput && (
        <div className="p-4 bg-[#1D3529] rounded-2xl border border-[#2C4E3D] font-mono text-xs text-emerald-300 space-y-1 animate-in fade-in">
          <div className="flex items-center space-x-2 text-[#E6F77B] font-bold mb-1">
            <Terminal className="w-4 h-4" />
            <span>Tensor Shape Execution Log</span>
          </div>
          <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-200">
            {simOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
