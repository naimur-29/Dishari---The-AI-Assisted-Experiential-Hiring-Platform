import React, { useState } from "react";
import toast from "react-hot-toast";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../components/ui/card";
// import CardContent from "../../components/ui/card";
// import CardFooter from "../../components/ui/card";
// import CardHeader from "../../components/ui/card";
// import CardTitle from "../../components/ui/card";
import { Check, X, FileText, FilePlus, Calendar } from "lucide-react";
import { Input } from "../../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textArea";
import { Button } from "../../components/ui/button";

const CreateChallenge = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [evaluationCriteria, setEvaluationCriteria] = useState("");
  const [submissionGuidelines, setSubmissionGuidelines] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      toast.error("Please enter a challenge title");
      return;
    }
    
    if (description.length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    
    if (!challengeType) {
      toast.error("Please select a challenge type");
      return;
    }

    if (!problemStatement.trim()) {
      toast.error("Problem statement is required");
      return;
    }

    if (!evaluationCriteria.trim()) {
      toast.error("Evaluation criteria is required");
      return;
    }

    if (!deadline) {
      toast.error("Please set a deadline");
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Challenge created successfully!");
      // Reset form after successful submission
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setChallengeType("");
    setProblemStatement("");
    setEvaluationCriteria("");
    setSubmissionGuidelines("");
    setDeadline("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <CreateChallengeHeader /> */}
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-medium">Create New Challenge</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Challenge Title
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="title"
                        placeholder="e.g., Build a landing page"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Challenge Type
                    </label>
                    <Select value={challengeType} onValueChange={setChallengeType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select challenge type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Response</SelectItem>
                        <SelectItem value="file">File Upload</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">
                      Problem Statement
                    </label>
                    <Textarea
                      id="problemStatement"
                      placeholder="Define the problem that candidates need to solve..."
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                      rows={3}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                      Deadline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Challenge Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Provide a general overview of this challenge..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-gray-500">
                      Min. 10 characters. Be clear about the general purpose.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="evaluationCriteria" className="block text-sm font-medium text-gray-700">
                      Evaluation Criteria
                    </label>
                    <Textarea
                      id="evaluationCriteria"
                      placeholder="How will submissions be evaluated? Add specific criteria..."
                      value={evaluationCriteria}
                      onChange={(e) => setEvaluationCriteria(e.target.value)}
                      rows={3}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="submissionGuidelines" className="block text-sm font-medium text-gray-700">
                      Submission Guidelines
                    </label>
                    <Textarea
                      id="submissionGuidelines"
                      placeholder="Provide specific instructions for submissions..."
                      value={submissionGuidelines}
                      onChange={(e) => setSubmissionGuidelines(e.target.value)}
                      rows={3}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-3 border-t py-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                disabled={isSubmitting}
                className="flex gap-1.5"
              >
                <X className="h-4 w-4" />
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 flex gap-1.5"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Create Challenge
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      {/* <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFFFFF",
            color: "#333333",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.875rem",
          },
          success: {
            iconTheme: {
              primary: "#4CAF50",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#F44336",
              secondary: "#FFFFFF",
            },
          },
        }}
      /> */}
    </div>
  );
};

export default CreateChallenge;