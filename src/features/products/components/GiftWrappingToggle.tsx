/* eslint-disable @next/next/no-img-element */

type GiftWrappingToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export function GiftWrappingToggle({
  enabled,
  onChange,
}: GiftWrappingToggleProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-[6px] bg-[#f4f0eb] p-5">
      <div className="flex min-w-0 flex-col items-start gap-1">
        <p className="text-[13px] font-semibold text-[#1a1a1a]">
          Complimentary Signature Gift Wrapping
        </p>
        <p className="text-[12px] font-normal text-[#605a54]">
          Encased in linen paper box with custom wax seal stamp.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Complimentary signature gift wrapping"
        className="shrink-0"
        onClick={() => onChange(!enabled)}
      >
        {enabled ? (
          <img src="/icons/switch-on.svg" alt="" width={44} height={24} />
        ) : (
          <span className="relative block h-6 w-11 rounded-full bg-[#d9d3cb]">
            <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white" />
          </span>
        )}
      </button>
    </div>
  );
}
