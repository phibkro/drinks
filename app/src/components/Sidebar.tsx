import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

export function Sidebar() {
  return (
    <div>
      <div>
        <h2 className="text-xl">Sorting</h2>
        <RadioGroup defaultValue="option-one">
          <Label className="text-lg" htmlFor="option-one">
            <RadioGroupItem value="option-one" id="option-one" />
            A-Z
          </Label>
          <Label className="text-lg" htmlFor="option-two">
            <RadioGroupItem value="option-two" id="option-two" />
            Z-A
          </Label>
        </RadioGroup>
      </div>
      <div>
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
        {[...Array(5).keys()].map((n) => (
          <div className="flex" key={n}>
            <Checkbox />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            ></label>
            {[...Array(n + 1).keys()].map((m) => (
              <Martini
                color={ratedColor}
                className="hover:cursor-pointer"
                key={m}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
