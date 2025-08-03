"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #2c3e50;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
  margin-bottom: 1rem;
  position: relative;
  min-width: 140px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #27ae60;
  color: white;

  &:hover:not(:disabled) {
    background-color: #229954;
  }
`;

const TertiaryButton = styled(Button)`
  background-color: #9b59b6;
  color: white;

  &:hover:not(:disabled) {
    background-color: #8e44ad;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorAlert = styled.div`
  background-color: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResultContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ResultSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultLabel = styled.h3`
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ResultContent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #495057;
  white-space: pre-wrap;

  h3,
  h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  h3:first-child,
  h4:first-child {
    margin-top: 0;
  }

  ul,
  ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
    list-style-position: outside;
  }

  p {
    margin: 0.75rem 0;
  }

  strong {
    font-weight: 600;
    color: #2c3e50;
  }

  em {
    font-style: italic;
  }
`;

const RandomContentContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.6;
  color: #495057;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;

    ${Button} {
      margin-right: 0;
      width: 100%;
    }
  }
`;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const parseMarkdown = (text) => {
  if (!text) return text;

  const html = text
    // Headers
    .replace(
      /### (.*$)/gim,
      '<h3 style="color: #2c3e50; font-size: 1.2rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0; border-bottom: 2px solid #3498db; padding-bottom: 0.25rem;">$1</h3>'
    )
    .replace(
      /#### (.*$)/gim,
      '<h4 style="color: #34495e; font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem 0;">$1</h4>'
    )
    // Bold and italic
    .replace(
      /\*\*(.*?)\*\*/gim,
      '<strong style="color: #2c3e50; font-weight: 600;">$1</strong>'
    )
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Line breaks and paragraphs
    .replace(/\n\n/gim, '</p><p style="margin: 0.75rem 0; line-height: 1.6;">')
    .replace(/\n/gim, "<br/>");

  // Handle bullet points
  const lines = html.split("<br/>");
  let inList = false;
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.match(/^- /)) {
      if (!inList) {
        processedLines.push(
          '<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">'
        );
        inList = true;
      }
      processedLines.push(
        `<li style="margin: 0.25rem 0;">${line.substring(2)}</li>`
      );
    } else if (line.match(/^\d+\. /)) {
      if (!inList) {
        processedLines.push(
          '<ol style="margin: 0.5rem 0; padding-left: 1.5rem;">'
        );
        inList = true;
      }
      processedLines.push(
        `<li style="margin: 0.25rem 0;">${line.replace(/^\d+\. /, "")}</li>`
      );
    } else {
      if (inList) {
        processedLines.push("</ul>");
        inList = false;
      }
      if (line) {
        processedLines.push(line);
      }
    }
  }

  if (inList) {
    processedLines.push("</ul>");
  }

  return `<p style="margin: 0.75rem 0; line-height: 1.6;">${processedLines.join(
    "<br/>"
  )}</p>`;
};

export default function InfluencerContentReview() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [submission, setSubmission] = useState("");
  const [reviewResult, setReviewResult] = useState(null);
  const [randomBrief, setRandomBrief] = useState("");
  const [randomSubmissionText, setRandomSubmissionText] = useState("");
  const [loading, setLoading] = useState({
    campaigns: false,
    review: false,
    brief: false,
    submission: false,
  });
  const [error, setError] = useState("");
  const [brandBrief, setBrandBrief] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const setLoadingState = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const fetchCampaigns = async () => {
    setLoadingState("campaigns", true);
    try {
      const response = await fetch(`${API_BASE_URL}/list_campaigns`);
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      const data = await response.json();
      setCampaigns(data.campaign_ids); // Updated to access campaign_ids property
    } catch (err) {
      handleError(
        "Failed to load campaigns. Please check if the backend is running."
      );
    } finally {
      setLoadingState("campaigns", false);
    }
  };

  const handleReviewSubmission = async () => {
    if (!selectedCampaign) {
      handleError("Please select a campaign ID");
      return;
    }
    if (!submission.trim()) {
      handleError("Please enter a submission");
      return;
    }
    if (!brandBrief.trim()) {
      handleError("Please enter a brand brief");
      return;
    }

    setLoadingState("review", true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/review_submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaign_id: selectedCampaign,
          submission: `Brand Brief: ${brandBrief.trim()}\n\nSubmission: ${submission.trim()}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to review submission");
      const data = await response.json();
      setReviewResult(data);
    } catch (err) {
      handleError("Failed to review submission. Please try again.");
    } finally {
      setLoadingState("review", false);
    }
  };

  const fetchRandomBrief = async () => {
    setLoadingState("brief", true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/random_brief`);
      if (!response.ok) throw new Error("Failed to fetch random brief");
      const data = await response.json();
      setBrandBrief(data.brief); // Populate the input instead of separate display
    } catch (err) {
      handleError("Failed to generate random brief. Please try again.");
    } finally {
      setLoadingState("brief", false);
    }
  };

  const fetchRandomSubmission = async () => {
    setLoadingState("submission", true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/random_submission`);
      if (!response.ok) throw new Error("Failed to fetch random submission");
      const data = await response.json();
      setSubmission(data.submission); // Populate the input instead of separate display
    } catch (err) {
      handleError("Failed to generate random submission. Please try again.");
    } finally {
      setLoadingState("submission", false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Influencer Content Review</Title>
        <Subtitle>
          Review content submissions against brand briefs for marketing
          campaigns
        </Subtitle>
      </Header>

      {error && <ErrorAlert>⚠️ {error}</ErrorAlert>}

      <Section>
        <SectionTitle>Campaign Selection</SectionTitle>

        <FormGroup>
          <Label htmlFor="campaign-select">Campaign ID</Label>
          <Select
            id="campaign-select"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            disabled={loading.campaigns}
          >
            <option value="">
              {loading.campaigns ? "Loading campaigns..." : "Select a Campaign"}
            </option>
            {campaigns.map((campaignId) => (
              <option key={campaignId} value={campaignId}>
                {campaignId}
              </option>
            ))}
          </Select>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Brand Brief</SectionTitle>

        <FormGroup>
          <Label htmlFor="brand-brief-textarea">Brand Brief</Label>
          <InputWithButton>
            <Textarea
              id="brand-brief-textarea"
              value={brandBrief}
              onChange={(e) => setBrandBrief(e.target.value)}
              placeholder="Enter the brand brief or generate a random one..."
              rows={6}
            />
            <InlineButton
              onClick={fetchRandomBrief}
              disabled={loading.brief}
              type="secondary"
            >
              {loading.brief ? <LoadingSpinner /> : "Generate Random Brief"}
            </InlineButton>
          </InputWithButton>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Content Submission</SectionTitle>

        <FormGroup>
          <Label htmlFor="submission-textarea">Submission</Label>
          <InputWithButton>
            <Textarea
              id="submission-textarea"
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Enter your video topic, draft script, or content description..."
              rows={6}
            />
            <InlineButton
              onClick={fetchRandomSubmission}
              disabled={loading.submission}
              type="tertiary"
            >
              {loading.submission ? (
                <LoadingSpinner />
              ) : (
                "Generate Random Submission"
              )}
            </InlineButton>
          </InputWithButton>
        </FormGroup>

        <PrimaryButton
          onClick={handleReviewSubmission}
          disabled={loading.review}
        >
          {loading.review ? <LoadingSpinner /> : "Review Submission"}
        </PrimaryButton>
      </Section>

      {reviewResult && (
        <Section>
          <SectionTitle>Review Results</SectionTitle>

          <ResultContainer>
            <ResultSection>
              <ResultLabel>Campaign ID</ResultLabel>
              <ResultContent>{reviewResult.campaign_id}</ResultContent>
            </ResultSection>

            <ResultSection>
              <ResultLabel>Brand Brief</ResultLabel>
              <ResultContent>{reviewResult.brief}</ResultContent>
            </ResultSection>

            <ResultSection>
              <ResultLabel>Your Submission</ResultLabel>
              <ResultContent>{reviewResult.submission}</ResultContent>
            </ResultSection>

            <ResultSection>
              <ResultLabel>Feedback</ResultLabel>
              <ResultContent
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(reviewResult.feedback),
                }}
              />
            </ResultSection>
          </ResultContainer>
        </Section>
      )}
    </Container>
  );
}

const InputWithButton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const InlineButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  height: fit-content;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.type === "secondary" &&
    `
    background-color: #27ae60;
    color: white;
    &:hover:not(:disabled) {
      background-color: #229954;
    }
  `}

  ${(props) =>
    props.type === "tertiary" &&
    `
    background-color: #9b59b6;
    color: white;
    &:hover:not(:disabled) {
      background-color: #8e44ad;
    }
  `}

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;
