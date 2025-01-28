"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useActionState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";
import { useState } from "react";

interface CoverImage {
    secure_url: string;
    // Ajoutez d'autres propriétés si nécessaire
}

const UpdateUser = ({ user }: { user: User }) => {
    const [open, setOpen] = useState(false);
    const [cover, setCover] = useState<CoverImage | null>(null);

    const [state, formAction] = useActionState(updateProfile, {
        success: false,
        error: false,
    });

    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        if (state.success) {
            router.refresh();
        }
    };

    const handleFormSubmit = async (formData: FormData) => {
        await formAction({ formData, cover: cover?.secure_url || user.cover || "" });
    };

    return (
        <div className="relative">
            <span
                className="text-blue-500 text-xs cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Modifier
            </span>
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            handleFormSubmit(formData);
                        }}
                        className="p-8 bg-white rounded-lg shadow-md flex flex-col gap-6 w-11/12 max-w-3xl relative"
                    >
                        {/* Bouton de Fermeture */}
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={handleClose}
                            aria-label="Fermer"
                        >
                            &times;
                        </button>

                        {/* Titre */}
                        <div>
                            <h1 className="text-xl font-semibold mb-2">Modifier Profil</h1>
                            <p className="text-xs text-gray-500">
                                Utilisez le lien dans la barre de navigation
                            </p>
                        </div>

                        {/* Téléchargement de la Photo de Couverture */}
                        <CldUploadWidget
                            uploadPreset="CHOV-social"
                            onSuccess={(result) => setCover(result.info)}
                        >
                            {({ open }) => (
                                <div
                                    className="flex flex-col gap-2 my-4 cursor-pointer"
                                    onClick={() => open?.()}
                                >
                                    <label htmlFor="cover" className="text-xs text-gray-500">
                                        Photo de couverture
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={cover?.secure_url || user.cover || "/noCover.png"}
                                            alt="Cover Image"
                                            width={48}
                                            height={32}
                                            className="w-12 h-8 rounded-md object-cover"
                                            loading="lazy"
                                        />
                                        <span className="text-xs underline text-gray-600">
                                            Changer
                                        </span>
                                    </div>
                                </div>
                            )}
                        </CldUploadWidget>

                        {/* Champs Caché pour l'URL de la Couverture */}
                        <input
                            type="hidden"
                            name="cover"
                            value={cover?.secure_url || user.cover || ""}
                        />

                        {/* Champs de Formulaire en Deux Colonnes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nom */}
                            <div className="flex flex-col">
                                <label htmlFor="nom" className="text-xs text-gray-500 mb-1">
                                    Nom
                                </label>
                                <input
                                    id="nom"
                                    type="text"
                                    className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                                    name="nom"
                                    defaultValue={user.name}
                                    required
                                />
                            </div>

                            {/* Prénom */}
                            <div className="flex flex-col">
                                <label htmlFor="prenom" className="text-xs text-gray-500 mb-1">
                                    Prénom
                                </label>
                                <input
                                    id="prenom"
                                    type="text"
                                    className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                                    name="surname"
                                    defaultValue={user.surname}
                                    required
                                />
                            </div>

                            {/* Métier */}
                            <div className="flex flex-col">
                                <label htmlFor="metier" className="text-xs text-gray-500 mb-1">
                                    Métier
                                </label>
                                <input
                                    id="metier"
                                    type="text"
                                    className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                                    name="metier"
                                    defaultValue={user.metier}
                                />
                            </div>

                            {/* Service */}
                            <div className="flex flex-col">
                                <label htmlFor="service" className="text-xs text-gray-500 mb-1">
                                    Service
                                </label>
                                <input
                                    id="service"
                                    type="text"
                                    className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                                    name="service"
                                    defaultValue={user.service}
                                />
                            </div>

                            {/* Site de Travail */}
                            <div className="flex flex-col md:col-span-2">
                                <label htmlFor="site" className="text-xs text-gray-500 mb-1">
                                    Site de travail
                                </label>
                                <input
                                    id="site"
                                    type="text"
                                    className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                                    name="site"
                                    defaultValue={user.site}
                                />
                            </div>
                        </div>

                        {/* Bouton de Mise à Jour */}
                        <UpdateButton disabled={state.loading} />

                        {/* Messages de Feedback */}
                        {state.success && (
                            <span className="text-green-500 text-sm">
                                Votre profil a été mis à jour avec succès !
                            </span>
                        )}
                        {state.error && (
                            <span className="text-red-500 text-sm">
                                Oups, quelque chose a mal tourné !
                            </span>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
