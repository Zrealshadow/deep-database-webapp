import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Users, Mail, ExternalLink, GraduationCap, Award } from 'lucide-react';
import { TeamMember, TeamCategory } from '../types/people';
import { loadPeople } from '../utils/peopleLoader';

const categories: TeamCategory[] = ['Faculty', 'Research Staff', 'PhD Student', 'Alumni'];

export const People: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPeople()
      .then((data) => {
        setTeamMembers(data.people);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">Error loading team members</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const groupedMembers = categories.reduce((acc, category) => {
    acc[category] = teamMembers.filter((m) => m.category === category);
    return acc;
  }, {} as Record<TeamCategory, TeamMember[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Team</h1>
          <p className="text-xl text-purple-100 text-center max-w-3xl mx-auto">
            Meet the researchers and engineers advancing the Deep Database project
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const members = groupedMembers[category];
            if (members.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  {category === 'Faculty' && <GraduationCap className="w-8 h-8 mr-3 text-primary-600" />}
                  {category === 'Alumni' && <Award className="w-8 h-8 mr-3 text-gray-600" />}
                  {category}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                    >
                      {/* Avatar Placeholder */}
                      <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full text-white text-3xl font-bold">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary-600 font-semibold text-center mb-4">
                        {member.role}
                      </p>

                      <p className="text-sm text-gray-700 mb-4">{member.bio}</p>

                      {member.interests && member.interests.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                            Research Interests
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {member.interests.map((interest, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-primary-600 hover:text-primary-700"
                            title="Email"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                        {member.website && (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                            title="Website"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Placeholder Message */}
        <div className="max-w-6xl mx-auto mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">
            <strong>Note:</strong> These are placeholder team members. Replace with actual team
            information and add profile photos.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
