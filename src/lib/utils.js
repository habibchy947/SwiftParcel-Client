import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const uploadImage = async (imageData) => {
  const formData = new FormData()
  formData.append('image', imageData)
  const {data} = await axios.post(`${import.meta.env.VITE_IMGBB_API_URL}?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
  return data.data.display_url
}