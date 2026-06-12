import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/features/auth/authStore";
import { User, Terminal, Lock, Briefcase, Zap, Check, Edit2, X, Code2, Layers, MapPin } from "lucide-react";
import { profileApi, editProfileApi } from "@/api/user.api";
import { profileSchema } from "@/schema/profile.schema";
import FormInput from "@/components/form/FormInput";
import { experienceLevelOptions, inisValues, workplaceModeOptions } from "./ProfileExtra";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [allocatedToken, setAllocatedToken] = useState(0);
    const inisialUser = useRef(inisValues);

    const [isPanding, setIsPanding] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: inisValues,
    });

    console.log(errors);    

    // Keep responsive structural changes dynamic via watch hooks
    const currentProfileImage = watch("profileImage");
    const currentName = watch("name");
    const currentTargetRole = watch("resumeTargetRoleTitle");
    const currentEmail = watch("email");

    useEffect(() => {
        getUpperProfile()
    }, []);

    const getUpperProfile = async () => {
        try {
            const { user: apiUser } = await profileApi();
            inisialUser.current = apiUser;
            reset(apiUser);
            if (apiUser?.allocatedToken !== undefined) {
                setAllocatedToken(apiUser.allocatedToken);
            }
        } catch (error) {
            console.error(`ProfilePage.jsx -> ${error}`);
        }
        finally {
            setIsPanding(false);
        }
    };

    // Central submission logic execution console printer
    const handleFormSubmit = async (data) => {
        console.log("Form submitted with data:", data);
        try {
            if(isPanding) return;
            setIsPanding(true);
            if (JSON.stringify(data) !== JSON.stringify(inisialUser.current)) {
                let payload = {};

                Object.keys(data).forEach((key) => {
                    if (data[key] !== inisialUser.current[key]) {
                        payload[key] = data[key];
                    }
                });

                const result = await editProfileApi(payload);
                alert(result.message);
                getUpperProfile();
                setIsEditing(false);
            }   
            else {
                alert("No changes detected to update.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
        finally {
            setIsPanding(false);
        }
    };

    const handleCancel = () => {
        reset(inisialUser.current);
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("profileImage", reader.result, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-[#0f0f0f] text-white font-sans antialiased selection:bg-orange-500/30 relative py-16 px-6 sm:px-12 overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-5xl mx-auto space-y-10 relative z-10">

                {/* TOP PANEL SECTION HEADER BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.04] pb-6 gap-4">
                    <div>
                        <span className="text-[9px] font-mono tracking-[0.3em] text-gray-500 uppercase block mb-1">
                            Configuration Control // Account Registry
                        </span>
                        <h1 className="text-3xl font-light tracking-tight text-white">
                            Identity <span className="font-semibold text-orange-500">Settings</span>
                        </h1>
                    </div>

                    {/* Active Edit Toggle Triggers */}
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 hover:border-orange-500/30 rounded-xl text-xs font-mono tracking-wider text-gray-300 hover:text-white transition-all self-start sm:self-auto"
                        >
                            <Edit2 className="w-3.5 h-3.5 text-orange-500" />
                            <span>EDIT PROFILE NODE</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent border border-white/5 hover:border-white/10 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>CANCEL</span>
                            </button>

                            <button
                                type="submit"
                                disabled={isPanding}
                                onClick={() => console.log("Submitting form with data:", watch())}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider rounded-xl transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98]"
                            >
                                <Check className="w-3.5 h-3.5" />
                                <span>SAVE CONFIG</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* PROFILE CONTROL MATRIX GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COMPONENT: STARK AVATAR BANNER WITH IMAGE UPLOAD */}
                    <div className="lg:col-span-5 bg-[#141414] border border-white/[0.06] rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl lg:sticky lg:top-24">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.01] to-transparent pointer-events-none" />

                        {/* INTERACTIVE UPLOAD CONTAINER */}
                        <div className="relative group/avatar mb-6">
                            <label
                                htmlFor="avatar-upload"
                                className={`w-24 h-24 bg-[#0f0f0f] border rounded-2xl flex items-center justify-center relative shadow-inner overflow-hidden select-none transition-all duration-300 ${isEditing
                                    ? "cursor-pointer border-orange-500/40 hover:border-orange-500 bg-orange-500/[0.02]"
                                    : "border-white/10"
                                    }`}
                            >
                                {currentProfileImage ? (
                                    <img
                                        src={currentProfileImage}
                                        alt={currentName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                                    />
                                ) : (
                                    <User className="w-8 h-8 text-gray-500 group-hover/avatar:text-orange-400 transition-colors" />
                                )}

                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1">
                                        <Terminal className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                                        <span className="text-[8px] font-mono tracking-wider text-white font-bold uppercase">
                                            UPDATE_IMG
                                        </span>
                                    </div>
                                )}

                                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-orange-500" />
                                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-orange-500" />
                            </label>

                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/png, image/jpeg, image/webp"
                                disabled={!isEditing}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="space-y-1 w-full px-2">
                            <h2 className="text-xl font-semibold text-white tracking-tight truncate">
                                {currentName}
                            </h2>
                            <p className="text-xs font-mono text-orange-500 uppercase tracking-widest truncate">
                                {currentTargetRole}
                            </p>
                        </div>

                        {/* TOKENS METRIC WIDGET BLOCK */}
                        <div className="w-full bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 flex items-center justify-between mt-8">
                            <div className="space-y-0.5 text-left">
                                <span className="text-gray-600 font-mono text-[8px] tracking-wider uppercase block">
                                    Allocation Tokens
                                </span>
                                <span className="text-xs text-gray-400 font-sans font-light block">
                                    Available AI Scans
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 bg-orange-500/5 border border-orange-500/15 px-3 py-1.5 rounded-lg shrink-0">
                                <Zap className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                                <span className="text-sm font-mono font-bold text-white">{allocatedToken}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COMPONENT: FIELD INPUT PANEL CONTAINER */}
                    <div className="lg:col-span-7 bg-[#141414] border border-white/[0.06] rounded-2xl p-8 space-y-6 shadow-xl relative">

                        <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase border-b border-white/[0.04] pb-3">
                            <Terminal className="w-4 h-4 text-orange-500" />
                            <span>Account Operational Parameters</span>
                        </div>

                        {/* Input Grid / Stack */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* FIELD 1: FULL NAME */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 transition-all focus-within:border-orange-500/20 sm:col-span-2">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                                    <User className="w-3 h-3 text-gray-700" /> Operator Name
                                </label>
                                {isEditing ? (
                                    <FormInput
                                        id="name"
                                        register={register("name")}
                                        error={errors.name}
                                        divClass="w-full"
                                        className="w-full bg-transparent border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-300 block font-light tracking-wide py-0.5">{inisialUser?.current?.name}</span>
                                )}
                            </div>

                            {/* FIELD 2: SECURE EMAIL (LOCKED SYSTEM PROPERTY) */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 opacity-60 sm:col-span-2 select-none">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5">
                                    <Lock className="w-3 h-3 text-gray-700" /> Registered Email Address // Secured
                                </label>
                                <span className="text-xs text-gray-400 block font-mono tracking-wide py-0.5 normal-case">{currentEmail}</span>
                            </div>

                            {/* FIELD 3: TARGET RESUME JOB ROLE */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 transition-all focus-within:border-orange-500/20 sm:col-span-2">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                                    <Briefcase className="w-3 h-3 text-gray-700" /> Resume Target Role Title
                                </label>
                                {isEditing ? (
                                    <FormInput
                                        id="resumeTargetRoleTitle"
                                        register={register("resumeTargetRoleTitle")}
                                        error={errors.resumeTargetRoleTitle}
                                        divClass="w-full"
                                        className="w-full bg-transparent border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-300 block font-light tracking-wide py-0.5">{inisialUser?.current?.resumeTargetRoleTitle}</span>
                                )}
                            </div>

                            {/* FIELD 4: PRIMARY TECH FOCUS */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 transition-all focus-within:border-orange-500/20">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                                    <Code2 className="w-3 h-3 text-gray-700" /> Primary Tech Focus
                                </label>
                                {isEditing ? (
                                    <FormInput
                                        id="primaryTechFocus"
                                        register={register("primaryTechFocus")}
                                        error={errors.primaryTechFocus}
                                        divClass="w-full"
                                        className="w-full bg-transparent border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-300 block font-light tracking-wide py-0.5">{inisialUser?.current?.primaryTechFocus}</span>
                                )}
                            </div>

                            {/* FIELD 5: EXPERIENCE LEVEL */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 transition-all focus-within:border-orange-500/20">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                                    <Layers className="w-3 h-3 text-gray-700" /> Experience Level
                                </label>
                                {isEditing ? (
                                    <div>
                                        <select
                                            {...register("experienceLevel")}
                                            className="w-full bg-[#0f0f0f] border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0 cursor-pointer"
                                        >
                                            {experienceLevelOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.experienceLevel && (
                                            <p className="text-xs font-medium text-red-500 mt-1">{errors.experienceLevel.message}</p>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-300 block font-light tracking-wide py-0.5">{inisialUser?.current?.experienceLevel}</span>
                                )}
                            </div>

                            {/* FIELD 6: PREFERRED WORKPLACE MODE */}
                            <div className="bg-[#0f0f0f] border border-white/[0.04] rounded-xl p-4 transition-all focus-within:border-orange-500/20 sm:col-span-2">
                                <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                                    <MapPin className="w-3 h-3 text-gray-700" /> Preferred Workplace Mode
                                </label>
                                {isEditing ? (
                                    <div>
                                        <select
                                            {...register("workplaceMode")}
                                            className="w-full bg-[#0f0f0f] border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0 cursor-pointer"
                                        >
                                            {workplaceModeOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.workplaceMode && (
                                            <p className="text-xs font-medium text-red-500 mt-1">{errors.workplaceMode.message}</p>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-300 block font-light tracking-wide py-0.5">{inisialUser?.current?.workplaceMode}</span>
                                )}
                            </div>

                        </div>

                        {/* Bottom Status Row Indicator */}
                        <div className="flex items-center gap-3 pt-6 border-t border-white/[0.04] mt-6 text-gray-500 font-mono text-[9px] tracking-wider uppercase select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>All mutations synced under live browser state memory keys.</span>
                        </div>

                    </div>

                </div>

            </form>
        </div>
    );
};

export default ProfilePage;