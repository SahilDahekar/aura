import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/MultiSelect/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";

// Updated Zod Schema with a single URL field
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  id: z.string().min(1, "ID is required"),
  tools: z.array(z.string()).nonempty("Select at least one tool"),
  commonUrl: z.string().min(1, "Common URL is required"),
  notificationChannel: z.enum(["Slack", "Email"], { required_error: "Notification channel is required" }),
  notificationLink: z.string().min(1, "Notification link is required")
});

type FormData = z.infer<typeof formSchema>;

const frameworksList = [
  { value: "owasp_zap", label: "Owasp Zap" },
  { value: "nikto", label: "Nikto"}

];

export default function MultiPartForm() {
  const [step, setStep] = useState(0);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      tools: [],
      commonUrl: "",
      notificationChannel: undefined,
      notificationLink: ""
    },
  });

  const tools = form.watch("tools");
  const notificationChannel = form.watch("notificationChannel");

  function nextStep() {
    switch(step) {
      case 0:
        form.trigger(["name", "id", "tools"]).then((isValid) => {
          if (isValid) {
            setStep((prev) => Math.min(prev + 1, 2));
          }
        });
        break;
      case 1:
        form.trigger("commonUrl").then((isValid) => {
          if (isValid) {
            setStep((prev) => Math.min(prev + 1, 2));
          }
        });
        break;
    }
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  async function submitData(values:any){
    try{
      const payload = {
        url : values.commonUrl,
        tool : values.tools,
        email : values.notificationLink
      }

      console.log(payload)
     const res= await api.post('/scan/scaninitiate', payload)
     console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<FormData> = (values) => {
    try {
      console.log(values);
      submitData(values);
      form.reset();
      setStep(0);
      setSelectedFrameworks([]);

      toast({
        title: "Form submitted successfully!",
        description: "All steps completed.",
      });
      
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to submit the form. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl py-6"
      >
        {step === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your tools</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedFrameworks(value);
                      }}
                      defaultValue={selectedFrameworks}
                      placeholder="Select tools"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormMessage />
                  
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">Selected Tools:</h2>
                    <ul className="list-disc list-inside">
                      {selectedFrameworks.map((framework) => (
                        <li key={framework}>{framework}</li>
                      ))}
                    </ul>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && tools && tools.length > 0 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="commonUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Common URL for Selected Tools</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter common URL for all selected tools"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2 text-sm text-muted-foreground">
                    This URL will be applied to all selected tools: {selectedFrameworks.join(", ")}
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="notificationChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Channel</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Slack">Slack</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="notificationLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{notificationChannel === "Slack" ? "Slack Webhook URL" : "Email Address"}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={notificationChannel === "Slack" 
                            ? "Enter Slack webhook URL" 
                            : "Enter email address"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 0 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Back
            </Button>
          )}
          {step < 2 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 2 && (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}