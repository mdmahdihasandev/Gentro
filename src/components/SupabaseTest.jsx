import { useEffect } from "react";
import { supabase } from "../utils/supabase";

function SupabaseTest() {
  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error:", error);
        return;
      }

      console.log("Products:", data);
    };

    getProducts();
  }, []);

  return <div></div>;
}

export default SupabaseTest;