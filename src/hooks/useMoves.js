import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

function useMoves(fen) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fen) return;

    setLoading(true);
    setError(null);

    async function fetchMoves() {
      const { data, error } = await supabase
        .from("Move")
        .select("*")
        .eq("fen", fen);

      if (error) setError(error);
      else setData(data);

      setLoading(false);
    }

    fetchMoves();
  }, [fen]);

  return { data, loading, error };
}

export default useMoves;
