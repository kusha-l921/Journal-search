import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Star, Clock, Globe, ExternalLink } from 'lucide-react';

interface JournalRecommendation {
  id: string;
  name: string;
  rationale: string;
  impactScore: number;
  acceptanceProbability: number;
  crossDisciplinary: boolean;
  subjectAreas: string[];
  submissionLink: string;
}

interface PublicationPreferences {
  highImpact: boolean;
  quickAcceptance: boolean;
  crossDisciplinary: boolean;
}

const JournalScout: React.FC = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [preferences, setPreferences] = useState<PublicationPreferences>({
    highImpact: false,
    quickAcceptance: false,
    crossDisciplinary: false,
  });
  const [recommendations, setRecommendations] = useState<JournalRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockRecommendations: JournalRecommendation[] = [
    {
      id: '1',
      name: 'Nature Machine Intelligence',
      rationale: 'Perfect match for AI research with interdisciplinary approach and high visibility in the field.',
      impactScore: 9.2,
      acceptanceProbability: 68,
      crossDisciplinary: true,
      subjectAreas: ['Machine Learning', 'Artificial Intelligence', 'Computer Science'],
      submissionLink: 'https://nature.com/natmachintell/submit',
    },
    {
      id: '2',
      name: 'Journal of Machine Learning Research',
      rationale: 'Open-access venue with rigorous peer review, ideal for methodological contributions.',
      impactScore: 7.8,
      acceptanceProbability: 82,
      crossDisciplinary: false,
      subjectAreas: ['Machine Learning', 'Statistics', 'Computer Science'],
      submissionLink: 'https://jmlr.org/submit',
    },
    {
      id: '3',
      name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
      rationale: 'Leading venue for pattern recognition and computer vision research with broad readership.',
      impactScore: 8.5,
      acceptanceProbability: 71,
      crossDisciplinary: false,
      subjectAreas: ['Pattern Recognition', 'Computer Vision', 'Machine Learning'],
      submissionLink: 'https://ieee.org/tpami/submit',
    },
    {
      id: '4',
      name: 'Artificial Intelligence Review',
      rationale: 'Comprehensive review journal that welcomes both survey and original research articles.',
      impactScore: 6.9,
      acceptanceProbability: 85,
      crossDisciplinary: true,
      subjectAreas: ['Artificial Intelligence', 'Computer Science', 'Engineering'],
      submissionLink: 'https://springer.com/airev/submit',
    },
    {
      id: '5',
      name: 'Machine Learning',
      rationale: 'Well-established journal focusing on fundamental machine learning research and applications.',
      impactScore: 7.3,
      acceptanceProbability: 79,
      crossDisciplinary: false,
      subjectAreas: ['Machine Learning', 'Data Mining', 'Statistics'],
      submissionLink: 'https://springer.com/ml/submit',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !abstract.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredRecommendations = [...mockRecommendations];
      
      // Apply preference filters
      if (preferences.highImpact) {
        filteredRecommendations = filteredRecommendations.filter(r => r.impactScore >= 7.5);
      }
      
      if (preferences.quickAcceptance) {
        filteredRecommendations = filteredRecommendations.filter(r => r.acceptanceProbability >= 75);
      }
      
      if (!preferences.crossDisciplinary) {
        filteredRecommendations = filteredRecommendations.filter(r => !r.crossDisciplinary);
      }
      
      setRecommendations(filteredRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const getImpactColor = (score: number): string => {
    if (score >= 8.5) return 'impact-badge';
    if (score >= 7.0) return 'success-badge';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="hero-section py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Journal Scout
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find the perfect academic journals for your research papers using AI-powered recommendations 
              based on your manuscript details and publication priorities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {/* Input Form */}
        <Card className="journal-card mb-12 animate-slide-up">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-lg font-medium mb-2 block">
                    Paper Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter your research paper title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg py-3"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="abstract" className="text-lg font-medium mb-2 block">
                    Abstract *
                  </Label>
                  <Textarea
                    id="abstract"
                    placeholder="Paste your research abstract here..."
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="min-h-[120px] text-base"
                    required
                  />
                </div>

                {/* Publication Preferences */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Publication Preferences (Optional)</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border">
                      <Switch
                        id="highImpact"
                        checked={preferences.highImpact}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, highImpact: checked }))
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-secondary" />
                        <Label htmlFor="highImpact" className="cursor-pointer">
                          High Impact
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border">
                      <Switch
                        id="quickAcceptance"
                        checked={preferences.quickAcceptance}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, quickAcceptance: checked }))
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <Label htmlFor="quickAcceptance" className="cursor-pointer">
                          Quick Acceptance
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border">
                      <Switch
                        id="crossDisciplinary"
                        checked={preferences.crossDisciplinary}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, crossDisciplinary: checked }))
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-success" />
                        <Label htmlFor="crossDisciplinary" className="cursor-pointer">
                          Cross-Disciplinary
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || !title.trim() || !abstract.trim()}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-effect"
              >
                {isLoading ? (
                  <>
                    <Search className="w-5 h-5 mr-2 animate-spin" />
                    Scouting Journals...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Scout Journals
                  </>
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Results Section */}
        {recommendations.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Recommended Journals
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                Top {recommendations.length} matches for your research
              </span>
            </h2>

            <div className="grid gap-6">
              {recommendations.map((journal, index) => (
                <Card key={journal.id} className="journal-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {journal.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {journal.rationale}
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild className="shrink-0">
                        <a 
                          href={journal.submissionLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <span>Submit</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Badge className={getImpactColor(journal.impactScore)}>
                        Impact Score: {journal.impactScore}
                      </Badge>
                      
                      <Badge className="success-badge">
                        {journal.acceptanceProbability}% Acceptance Rate
                      </Badge>
                      
                      {journal.crossDisciplinary && (
                        <Badge className="cross-disciplinary-badge">
                          🌐 Cross-Disciplinary
                        </Badge>
                      )}
                      
                      {journal.subjectAreas.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalScout;