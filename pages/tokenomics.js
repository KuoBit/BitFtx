import TokenomicsHero from "@/components/TokenomicsHero";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function TokenomicsPage() {
  return (
    <>
    <Header />
      <TokenomicsHero />
    <Footer />
    </>
  );
}
