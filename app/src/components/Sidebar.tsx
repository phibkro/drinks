import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

export function Sidebar() {
  return (
    <div className="">
      <div>
        <h2 className="text-xl">Sorting</h2>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label className="text-lg" htmlFor="option-one">
              A-Z
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label className="text-lg" htmlFor="option-two">
              Z-A
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h2 className="text-xl">Alcohol</h2>
        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Non-alcoholic
            </label>
          </div>
        </div>

        <h2 className="text-xl">Rating</h2>
        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Martini color={ratedColor} className="hover:cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <div className="flex">
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
              </div>
            </label>
          </div>
        </div>

        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <div className="flex">
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
              </div>
            </label>
          </div>
        </div>

        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <div className="flex">
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
              </div>
            </label>
          </div>
        </div>

        <div className="flex">
          <Checkbox />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <div className="flex">
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
                <Martini color={ratedColor} className="hover:cursor-pointer" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
