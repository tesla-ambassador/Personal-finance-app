interface EmptyPotsAndBudgetsProps {
  name: string;
  description: string;
}

export function EmptyPotsAndBudgets({
  name,
  description,
}: EmptyPotsAndBudgetsProps) {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <div className="flex flex-col items-center gap-4 text-center p-4">
        <h2 className="font-bold text-[2rem]">{name}</h2>
        <div className="w-48 rounded-lg overflow-hidden">
          <img
            src="/images/results-not-found.jpg"
            alt="Empty pot or budget"
            className="object-cover object-center"
          />
        </div>
        <p className="text-[1rem] text-[#696868]">{description}</p>
      </div>
    </div>
  );
}

// This is for the cards
export function EmptyPotsAndBudgetsCards({
  name,
  description,
}: EmptyPotsAndBudgetsProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4 text-center p-4">
        <h2 className="font-bold text-[2rem]">{name}</h2>
        <div className="w-48 rounded-lg overflow-hidden">
          <img
            src="/images/results-not-found.jpg"
            alt="Empty pot or budget"
            className="object-cover object-center"
          />
        </div>
        <p className="text-[1rem] text-[#696868]">{description}</p>
      </div>
    </div>
  );
}
