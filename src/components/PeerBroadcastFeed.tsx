"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Send,
  Terminal,
} from "lucide-react";
import { PeerPacket } from "@/types";
import { PEER_ALIASES } from "@/lib/constants";

interface PeerBroadcastFeedProps {
  currentDomain?: string;
}

export const PeerBroadcastFeed: React.FC<PeerBroadcastFeedProps> = ({
  currentDomain = "Distributed Systems",
}) => {
  const [packets, setPackets] = useState<PeerPacket[]>([]);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  useEffect(() => {
    const initial: PeerPacket[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `pkt-${Date.now() - i * 1500}`,
      peerId: `peer-${Math.floor(1000 + Math.random() * 9000)}`,
      peerAlias: PEER_ALIASES[i % PEER_ALIASES.length],
      nodeId: `vec-0x${(i * 123 + 45).toString(16)}`,
      nodeLabel: `Kinetic_Vector_${i + 1}`,
      timestamp: new Date(Date.now() - i * 1500).toLocaleTimeString(),
      vectorHash: `0x${Math.random().toString(16).slice(2, 10)}`,
      hopCount: Math.floor(Math.random() * 3 + 1),
      latency: parseFloat((Math.random() * 1.5 + 0.3).toFixed(2)),
      action: i % 2 === 0 ? "BROADCAST" : "RESOLVE",
    }));
    setPackets(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPeer =
        PEER_ALIASES[Math.floor(Math.random() * PEER_ALIASES.length)];
      const actions: Array<PeerPacket["action"]> = [
        "BROADCAST",
        "RESOLVE",
        "PULL_WEIGHTS",
        "PEER_HANDSHAKE",
      ];
      const selectedAction =
        actions[Math.floor(Math.random() * actions.length)];

      const newPacket: PeerPacket = {
        id: `pkt-${Date.now()}`,
        peerId: `peer-${Math.floor(1000 + Math.random() * 9000)}`,
        peerAlias: randomPeer,
        nodeId: `vec-0x${Math.floor(Math.random() * 0xffff).toString(16)}`,
        nodeLabel: `Tensor_${Math.floor(Math.random() * 99 + 1)}`,
        timestamp: new Date().toLocaleTimeString(),
        vectorHash: `0x${Math.random().toString(16).slice(2, 10)}`,
        hopCount: Math.floor(Math.random() * 3 + 1),
        latency: parseFloat((Math.random() * 1.8 + 0.2).toFixed(2)),
        action: selectedAction,
      };

      setPackets((prev) => [newPacket, ...prev.slice(0, 14)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleManualBroadcast = () => {
    setIsBroadcasting(true);
    const manualPacket: PeerPacket = {
      id: `pkt-${Date.now()}`,
      peerId: "self::primary-studio",
      peerAlias: "Studio-Master::Coordinator",
      nodeId: "vec-ROOT-KINETIC",
      nodeLabel: "FlashConcept_State_Sync",
      timestamp: new Date().toLocaleTimeString(),
      vectorHash: "0xFC991A8C",
      hopCount: 1,
      latency: 0.24,
      action: "BROADCAST",
    };

    setPackets((prev) => [manualPacket, ...prev.slice(0, 14)]);

    setTimeout(() => {
      setIsBroadcasting(false);
    }, 600);
  };

  return (
    <div className="card-studio p-4 rounded-xl border-2 border-[#222226] shadow-tactile relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#63F78F]/10 border-2 border-[#63F78F]/30 text-[#63F78F]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Peer Knowledge Telemetry
              </span>
              <span className="text-[10px] font-mono text-[#63F78F] flex items-center space-x-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#63F78F] animate-ping" />
                <span>WebRTC Mesh &bull; 8 Peers Synced</span>
              </span>
            </div>
          </div>

          <button
            onClick={handleManualBroadcast}
            disabled={isBroadcasting}
            className="btn-tactile-green px-2.5 py-1 rounded text-xs font-mono flex items-center space-x-1 disabled:opacity-50"
            title="Multicast state vector across peers"
          >
            <Send className={`w-3 h-3 ${isBroadcasting ? "animate-spin" : ""}`} />
            <span>Multicast</span>
          </button>
        </div>

        {/* Live Packet Stream */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 font-mono text-[11px]">
          {packets.map((pkt) => {
            const isBroadcast = pkt.action === "BROADCAST";
            return (
              <div
                key={pkt.id}
                className="p-2 rounded-lg bg-[#0D0D0E] border border-[#222226] flex items-center justify-between transition-all hover:border-[#333339]"
              >
                <div className="flex items-center space-x-2 overflow-hidden pr-2">
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      isBroadcast
                        ? "bg-[#FFAC3F]/20 text-[#FFAC3F] border border-[#FFAC3F]/40"
                        : "bg-[#63F78F]/20 text-[#63F78F] border border-[#63F78F]/40"
                    }`}
                  >
                    {pkt.action}
                  </span>
                  <span className="text-white truncate max-w-[120px] font-bold">
                    {pkt.peerAlias}
                  </span>
                  <span className="text-[#9CA3AF] text-[10px] hidden sm:inline">
                    {pkt.vectorHash}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-[#9CA3AF] flex-shrink-0">
                  <span className="text-[#63F78F] font-bold">
                    {pkt.latency}ms
                  </span>
                  <span className="text-[#9CA3AF]">[{pkt.hopCount}h]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 mt-2 border-t border-[#222226] flex items-center justify-between text-[10px] font-mono text-[#9CA3AF]">
        <span className="flex items-center space-x-1">
          <Terminal className="w-3 h-3 text-[#63F78F]" />
          <span>ZK-Vector Consensus Engine</span>
        </span>
        <span className="text-[#FFAC3F] font-bold">Sub-2ms Latency</span>
      </div>
    </div>
  );
};
