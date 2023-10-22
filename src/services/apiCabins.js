import { supabase, superbaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw Error("Failed to fetch cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(superbaseUrl);

  // 1. Create a file path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${superbaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  let query = supabase.from("cabins");

  //   IF no ID Creating a cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //   IF ID Edit a cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw Error("Failed to create cabin");
  }

  // If the image already exist | No need to upload.
  if (hasImagePath) return data;

  //   2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.error(error);
    throw Error("Failed to delete cabin");
  }
}
