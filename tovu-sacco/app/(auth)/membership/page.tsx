"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAccounts } from "@/context/AccountsContext";
import { NextOfKin } from "@/types/accounts";

export default function MembershipPage() {
  const router = useRouter();
  const { createKYC, createNextOfKin, loading } = useAccounts();
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

      toast.success("Membership registered successfully!");
      router.replace("/dashboard");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Membership Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold">Personal Details</h3>
            <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
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

        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold">Identification & Contact</h3>
            <Select onValueChange={(value) => setFormData({ ...formData, identityType: value })} required>
              <SelectTrigger><SelectValue placeholder="Identity Type" /></SelectTrigger>
              <SelectContent>
              <SelectItem value="national_id_card">National ID Card</SelectItem>
              <SelectItem value="drivers_licence">Drives Licence</SelectItem>
              <SelectItem value="international_passport">International Passport</SelectItem>
              </SelectContent>
            </Select>
            <Input name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} required />
            <Input name="kraPin" placeholder="KRA Pin" value={formData.kraPin} onChange={handleChange} required />
            <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold">Next of Kin</h3>
            {nextOfKins.map((kin, index) => (
              <div key={kin.id} className="space-y-2 border p-4 rounded-lg">
                <Input placeholder="Full Name" value={kin.name} onChange={(e) => updateNextOfKin(index, "name", e.target.value)} required />
                <Input placeholder="Relationship" value={kin.relationship} onChange={(e) => updateNextOfKin(index, "relationship", e.target.value)} required />
                <Input placeholder="Contact Number" type="tel" value={kin.contact_number} onChange={(e) => updateNextOfKin(index, "contact_number", e.target.value)} required />
                <Button type="button" variant="destructive" onClick={() => removeNextOfKin(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={addNextOfKin}>Add Next of Kin</Button>
            <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
          </>
        )}

        <div className="flex justify-between">
          {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
          {step < 3 && <Button onClick={handleNext}>Next</Button>}
        </div>
      </form>
    </div>
  );
}
