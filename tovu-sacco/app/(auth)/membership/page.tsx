"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAccounts } from "@/context/AccountsContext";
import { NextOfKin } from "@/types/accounts";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MembershipPage() {
  const router = useRouter();
  const { createKYC, createNextOfKin, loading } = useAccounts();
  const { toast } =  useToast();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    identityType: "",
    idNumber: "",
    dateOfBirth: "",
    kraPin: "",
    employmentStatus: "",
    country: "",
    county: "",
    town: "",
    phone: "",
  });

  const [nextOfKins, setNextOfKins] = useState<NextOfKin[]>([]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    } else if (step === 2) {
      if (!formData.identityType) newErrors.identityType = "Identity Type is required";
      if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
      if (!formData.phone) newErrors.phone = "Phone Number is required";
      if (!formData.country) newErrors.country = "Country is required";
    } else if (step === 3) {
      if (nextOfKins.length === 0) newErrors.nextOfKin = "At least one Next of Kin is required";
      nextOfKins.forEach((kin, index) => {
        if (!kin.name) newErrors[`kinName${index}`] = "Full Name is required";
        if (!kin.relationship) newErrors[`kinRelation${index}`] = "Relationship is required";
        if (!kin.contact_number) newErrors[`kinContact${index}`] = "Contact Number is required";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const addNextOfKin = () => {
    setNextOfKins([...nextOfKins, { id: crypto.randomUUID(), name: "", relationship: "", contact_number: "" }]);
  };

  const updateNextOfKin = (index: number, key: keyof NextOfKin, value: string) => {
    const updatedNextOfKins = [...nextOfKins];
    updatedNextOfKins[index][key] = value;
    setNextOfKins(updatedNextOfKins);
  };

  const removeNextOfKin = (index: number) => {
    const updatedNextOfKins = nextOfKins.filter((_, i) => i !== index);
    setNextOfKins(updatedNextOfKins);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const kycData = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        marital_status: formData.maritalStatus,
        gender: formData.gender,
        identity_type: formData.identityType,
        id_number: formData.idNumber,
        date_of_birth: formData.dateOfBirth,
        kra_pin: formData.kraPin,
        employment_status: formData.employmentStatus,
        country: formData.country,
        county: formData.county,
        town: formData.town,
        contact_number: formData.phone,
        kyc_submitted: true,
      };

      await createKYC(kycData);

      for (const kin of nextOfKins) {
        await createNextOfKin({
          name: kin.name,
          relationship: kin.relationship,
          contact_number: kin.contact_number,
        });
      }
      toast({
        title: "Success",
        description: "Membership registered successfully!",
        variant: "default",
      });
      router.replace("/dashboard");
    } catch (error:any) {
      if (error.non_field_errors){
        toast({
          title: "Error",
          description: error.non_field_errors[0],
          variant: "destructive",
        });
      }
      else if (error.kra_pin){
        toast({
          title: "Error",
          description: error.kra_pin,
          variant: "destructive",
        });
      }
      else if (error.contact_number){
        toast({
          title: "Error",
          description: error.contact_number,
          variant: "destructive",
        });
      }
      else if (error.id_number){
        toast({
          title: "Error",
          description: error.id_number,
          variant: "destructive",
        });
      }
      else{
        toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
      });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-6 relative">
        {/* Close Button */}
        <button 
          onClick={() => router.push("/")} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <CardHeader>
          <CardTitle className="text-center">Membership Registration</CardTitle>
        </CardHeader>
          <form onSubmit={handleSubmit} className="max-h-[65vh] overflow-y-auto p-2 space-y-6">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                  <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>
                <Select onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                  <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })} required>
                  <SelectTrigger><SelectValue placeholder="Marital Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="dateOfBirth" type="date" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} required />
              </>
            )}

            {/* Step 2: Identification & Contact */}
            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold text-gray-700">Identification & Contact</h3>
                <Select onValueChange={(value) => setFormData({ ...formData, identityType: value })} required>
                  <SelectTrigger><SelectValue placeholder="Identity Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id_card">National ID Card</SelectItem>
                    <SelectItem value="drivers_licence">Driver's License</SelectItem>
                    <SelectItem value="international_passport">International Passport</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} required />
                <Input name="kraPin" placeholder="KRA Pin" value={formData.kraPin} onChange={handleChange} required />
                <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              </>
            )}

            {/* Step 3: Next of Kin */}
            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold text-gray-700">Next of Kin</h3>
                {nextOfKins.map((kin, index) => (
                  <div key={kin.id} className="space-y-2 border border-gray-200 p-4 rounded-lg">
                    <Input placeholder="Full Name" value={kin.name} onChange={(e) => updateNextOfKin(index, "name", e.target.value)} required />
                    <Input placeholder="Relationship" value={kin.relationship} onChange={(e) => updateNextOfKin(index, "relationship", e.target.value)} required />
                    <Input placeholder="Contact Number" type="tel" value={kin.contact_number} onChange={(e) => updateNextOfKin(index, "contact_number", e.target.value)} required />
                    <Button type="button" variant="destructive" onClick={() => removeNextOfKin(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addNextOfKin}>Add Next of Kin</Button>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
            {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
            {step < 3 && <Button onClick={handleNext}>Next</Button>}
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}