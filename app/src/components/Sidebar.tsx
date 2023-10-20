import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Sorting</h2>
      <RadioGroup defaultValue="option-one" className="flex flex-col">
        <Label className="flex items-center gap-1 text-lg" htmlFor="option-one">
          <RadioGroupItem value="option-one" id="option-one" />
          A-Z
        </Label>
        <Label className="flex items-center gap-1 text-lg" htmlFor="option-two">
          <RadioGroupItem value="option-two" id="option-two" />
          Z-A
        </Label>
      </RadioGroup>

      <h2 className="text-xl">Alcohol</h2>
      <div className="flex">
        <Checkbox />
        <label
          htmlFor="terms1"
          className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Non-alcoholic
        </label>
      </div>

      <h2 className="text-xl">Rating</h2>
      {Array(5)
        .fill(5)
        .map((_, n) => (
          <div className="flex" key={n}>
            <Checkbox />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            ></label>
            {Array(n + 1)
              .fill(n + 1)
              .map((_, m) => (
                <Martini
                  color={ratedColor}
                  className="hover:cursor-pointer"
                  key={m}
                />
              ))}
          </div>
        ))}
    </div>
  );
}
