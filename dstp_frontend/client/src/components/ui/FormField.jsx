import cn from "@/utils/cn";

const inputBaseClasses =
  "w-full rounded-xl border px-4 py-3 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:ring-2";

function fieldBorderClasses(hasError) {
  return hasError
    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
    : "border-gray-200 focus:border-coral-300 focus:ring-coral-100";
}

function FieldLayout({
  label,
  htmlFor,
  error,
  hint = "",
  required = false,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-sm font-semibold text-enterprise-mid"
        >
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      {!error && hint ? <p className="mt-1 text-xs text-enterprise-grey">{hint}</p> : null}
    </div>
  );
}

export function TextInput({
  id,
  label,
  error = "",
  hint = "",
  required = false,
  className = "",
  ...props
}) {
  return (
    <FieldLayout
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
    >
      <input
        id={id}
        className={cn(inputBaseClasses, fieldBorderClasses(Boolean(error)), className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldLayout>
  );
}

export function TextAreaField({
  id,
  label,
  error = "",
  hint = "",
  required = false,
  className = "",
  rows = 5,
  ...props
}) {
  return (
    <FieldLayout
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
    >
      <textarea
        id={id}
        rows={rows}
        className={cn(
          inputBaseClasses,
          "resize-y",
          fieldBorderClasses(Boolean(error)),
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldLayout>
  );
}

export function SelectField({
  id,
  label,
  error = "",
  hint = "",
  required = false,
  options = [],
  className = "",
  ...props
}) {
  return (
    <FieldLayout
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
    >
      <select
        id={id}
        className={cn(inputBaseClasses, fieldBorderClasses(Boolean(error)), className)}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {options.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }

          return (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          );
        })}
      </select>
    </FieldLayout>
  );
}

export function CheckboxField({
  id,
  label,
  hint = "",
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="inline-flex items-center gap-2 text-sm text-enterprise-mid"
      >
        <input
          id={id}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-coral-500 focus:ring-coral-200",
            className,
          )}
          {...props}
        />
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-enterprise-grey">{hint}</p> : null}
    </div>
  );
}

export function FormNotice({ tone = "neutral", children, className = "" }) {
  const toneClasses =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-gray-200 bg-gray-50 text-enterprise-grey";

  return (
    <div className={cn("rounded-xl border px-4 py-3 text-sm", toneClasses, className)}>
      {children}
    </div>
  );
}
