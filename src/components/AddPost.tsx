"use client";

import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

// Import du picker dynamiquement pour éviter l'usage côté serveur
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
});

const AddPost = () => {
    const { user, isLoaded } = useUser();
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<any>();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    if (!isLoaded) {
        return "Loading...";
    }

    // Callback quand on sélectionne un emoji :
    const onEmojiClick = (emojiData: any) => {
        // emojiData contient différentes infos, la propriété .emoji est le caractère emoji
        const { emoji } = emojiData;
        setDesc((prev) => prev + emoji);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* AVATAR */}
            <Image
                src={user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-full"
            />
            {/* POST */}
            <div className="flex-1 relative">
                {/* TEXT INPUT */}
                <form
                    action={(formData) => addPost(formData, img?.secure_url || "")}
                    className="flex gap-4"
                >
          <textarea
              placeholder="Que souhaitez-vous partager ?"
              className="flex-1 bg-slate-100 rounded-lg p-2"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
          ></textarea>
                    <div className="flex flex-col items-end gap-2">
                        {/* Icône Emoji */}
                        <Image
                            src="/emoji.png"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                        />

                        <AddPostButton />
                    </div>
                </form>

                {/* Affichage du Picker en position absolue si showEmojiPicker est true */}
                {showEmojiPicker && (
                    <div className="absolute z-10 bg-white">
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                            // Vous pouvez ajuster le style ou la hauteur/largeur ici :
                            autoFocusSearch={false}
                        />
                    </div>
                )}

                {/* POST OPTIONS (image upload) */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <CldUploadWidget
                        uploadPreset="CHOV-social"
                        onSuccess={(result, { widget }) => {
                            setImg(result.info);
                            widget.close();
                        }}
                    >
                        {({ open }) => {
                            return (
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => open()}
                                >
                                    <Image src="/addimage.png" alt="" width={20} height={20} />
                                    Photo
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
