import LogoBlock from "@/components/common/LogoBlock";

const AuthLeftPage = ({ register = false }) => {

    return (
        <div className="hidden lg:flex w-[50%] items-center justify-center relative overflow-hidden bg-[#0f0f0f]">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />
            <div className="absolute w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full px-12">
                {/* Central Reusable Logo Component Node */}
                <LogoBlock />

                <div className="space-y-4">
                    <h1 className="text-white text-5xl font-light tracking-tight leading-[1.1]">
                        Establish your <br />
                        <span className="font-semibold">workspace engine.</span>
                    </h1>

                    <p className="text-gray-400 text-lg font-light max-w-sm">
                        Initialize your environment credentials to start orchestrating real-time resume audits and target job tracks.
                    </p>
                </div>

                {/* Industrial Status Accents */}
                <div className="mt-16 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-orange-500" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">
                        {register? `Registration Lifecycle`: `Authenticated Session`}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default AuthLeftPage;