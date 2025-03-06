import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/", { replace: true }); // Ensures no back navigation
  }, [navigate]);

  return null; // No UI needed
}
