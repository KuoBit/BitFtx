import TokenomicsHero from "@/components/TokenomicsHero";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function TokenomicsPage() {
  return (
    <>
      <TokenomicsHero />
      {/* Next sections will go here one by one */}
    </>
  );
}
