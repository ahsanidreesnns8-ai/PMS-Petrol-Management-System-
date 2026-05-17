export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input className={`input-field ${error ? 'border-red-500' : ''}`} {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
