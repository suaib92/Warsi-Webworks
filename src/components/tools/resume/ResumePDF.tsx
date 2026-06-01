"use client";

import { Document, Page, Text, View, StyleSheet, Font, Link, PDFDownloadLink } from '@react-pdf/renderer';
import { useResume } from './ResumeContext';
import { ResumeData } from '@/lib/types/resume';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

const formatSkills = (skills: string) => {
  return skills.split(',').map(s => s.trim()).filter(Boolean).join(' | ');
};

// Create styles
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 10, lineHeight: 1.5 },
  header: { marginBottom: 15, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10 },
  title: { fontSize: 12, color: '#444', textTransform: 'uppercase', marginBottom: 8 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: 9, color: '#666', gap: 10 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 2, marginBottom: 5, marginTop: 10 },
  paragraph: { fontSize: 10, marginBottom: 5 },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  
  // Experience Block
  expBlock: { marginBottom: 8 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  expRole: { fontWeight: 'bold', fontSize: 10 },
  expDate: { fontSize: 9 },
  expCompany: { fontSize: 9, fontStyle: 'italic', marginBottom: 2 },
  
  // Professional Template Specifics
  profHeader: { borderBottomWidth: 2, borderBottomColor: '#1e3a8a', paddingBottom: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  profName: { fontSize: 26, fontWeight: 'bold', color: '#1e3a8a', textTransform: 'uppercase' },
  profTitle: { fontSize: 14, color: '#444', textTransform: 'uppercase' },
  profContactColumn: { alignItems: 'flex-end', fontSize: 9, color: '#666' },
  profSectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e3a8a', textTransform: 'uppercase', marginBottom: 5, marginTop: 10 },
  
  // Developer Template Specifics
  devHeader: { borderBottomWidth: 2, borderBottomColor: '#000', paddingBottom: 10, marginBottom: 15 },
  devName: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' },
  devTitleBox: { backgroundColor: '#000', color: '#fff', padding: '2 4', alignSelf: 'flex-start', fontSize: 12, fontWeight: 'bold', marginTop: 5, marginBottom: 10 },
  devContact: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, fontSize: 9 },
  devGrid: { flexDirection: 'row', gap: 20 },
  devColMain: { width: '65%' },
  devColSide: { width: '35%' },
});

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.name}>{data.personalInfo.name}</Text>
      <Text style={styles.title}>{data.personalInfo.title}</Text>
      <View style={styles.contact}>
        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
        {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
        {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
        {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
        {data.personalInfo.github && <Text>{data.personalInfo.github}</Text>}
      </View>
    </View>

    {data.personalInfo.summary && (
      <View>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.paragraph}>{data.personalInfo.summary}</Text>
      </View>
    )}

    {data.skills && (
      <View>
        <Text style={styles.sectionTitle}>Core Skills</Text>
        <Text style={styles.paragraph}>{formatSkills(data.skills)}</Text>
      </View>
    )}

    {data.experience.length > 0 && (
      <View>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map(exp => (
          <View key={exp.id} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
            </View>
            <Text style={styles.expCompany}>{exp.company} {exp.location ? "- " + exp.location : ''}</Text>
            <Text style={styles.paragraph}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.projects.length > 0 && (
      <View>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map(proj => (
          <View key={proj.id} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{proj.name}</Text>
              <Text style={styles.expDate}>{proj.githubUrl}</Text>
            </View>
            <Text style={styles.expCompany}>{proj.techStack}</Text>
            <Text style={styles.paragraph}>{proj.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.education.length > 0 && (
      <View>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map(edu => (
          <View key={edu.id} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{edu.degree}</Text>
              <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
            </View>
            <Text style={styles.paragraph}>{edu.school} {edu.location ? "- " + edu.location : ''}</Text>
          </View>
        ))}
      </View>
    )}

    {data.certifications.length > 0 && (
      <View>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {data.certifications.map(cert => (
          <View key={cert.id} style={styles.expHeader} wrap={false}>
            <Text style={styles.bold}>{cert.name} - <Text style={styles.italic}>{cert.issuer}</Text></Text>
            <Text style={styles.expDate}>{cert.date}</Text>
          </View>
        ))}
      </View>
    )}
  </Page>
);

const ProfessionalTemplate = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.profHeader}>
      <View>
        <Text style={styles.profName}>{data.personalInfo.name}</Text>
        <Text style={styles.profTitle}>{data.personalInfo.title}</Text>
      </View>
      <View style={styles.profContactColumn}>
        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
        {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
        {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
        {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
      </View>
    </View>

    {data.personalInfo.summary && (
      <View>
        <Text style={styles.paragraph}>{data.personalInfo.summary}</Text>
      </View>
    )}

    {data.skills && (
      <View>
        <Text style={styles.profSectionTitle}>Core Skills</Text>
        <Text style={styles.paragraph}>{formatSkills(data.skills)}</Text>
      </View>
    )}

    {data.experience.length > 0 && (
      <View>
        <Text style={styles.profSectionTitle}>Experience</Text>
        {data.experience.map(exp => (
          <View key={exp.id} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
            </View>
            <Text style={[styles.expCompany, { color: '#1e3a8a' }]}>{exp.company} {exp.location ? " | " + exp.location : ''}</Text>
            <Text style={styles.paragraph}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.projects.length > 0 && (
      <View>
        <Text style={styles.profSectionTitle}>Projects</Text>
        {data.projects.map(proj => (
          <View key={proj.id} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{proj.name}</Text>
              <Text style={styles.expDate}>{proj.githubUrl}</Text>
            </View>
            <Text style={[styles.expCompany, { color: '#1e3a8a' }]}>{proj.techStack}</Text>
            <Text style={styles.paragraph}>{proj.description}</Text>
          </View>
        ))}
      </View>
    )}

    <View style={styles.devGrid}>
      <View style={styles.devColMain}>
        {data.education.length > 0 && (
          <View>
            <Text style={styles.profSectionTitle}>Education</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{edu.degree}</Text>
                <Text style={styles.paragraph}>{edu.school}</Text>
                <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.devColSide}>
        {data.certifications.length > 0 && (
          <View>
            <Text style={styles.profSectionTitle}>Certifications</Text>
            {data.certifications.map(cert => (
              <View key={cert.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{cert.name}</Text>
                <Text style={styles.paragraph}>{cert.issuer}</Text>
                <Text style={styles.expDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  </Page>
);

const DeveloperTemplate = ({ data }: { data: ResumeData }) => (
  <Page size="A4" style={[styles.page, { fontFamily: 'Courier' }]}>
    <View style={styles.devHeader}>
      <Text style={styles.devName}>{data.personalInfo.name}</Text>
      <Text style={styles.devTitleBox}>{data.personalInfo.title}</Text>
      <View style={styles.devContact}>
        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
        {data.personalInfo.github && <Text>{data.personalInfo.github}</Text>}
        {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
        {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
      </View>
    </View>

    {data.personalInfo.summary && (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.paragraph}>{data.personalInfo.summary}</Text>
      </View>
    )}

    {data.skills && (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.bold}>TECH STACK: </Text>
        <Text style={styles.paragraph}>{formatSkills(data.skills)}</Text>
      </View>
    )}

    <View style={styles.devGrid}>
      <View style={styles.devColMain}>
        {data.experience.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { borderBottomStyle: 'dashed' }]}>Experience</Text>
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expDate}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
                <Text style={styles.paragraph}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}
        
        {data.projects.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { borderBottomStyle: 'dashed' }]}>Projects</Text>
            {data.projects.map(proj => (
              <View key={proj.id} style={styles.expBlock} wrap={false}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{proj.name}</Text>
                  <Text style={styles.expDate}>{proj.githubUrl}</Text>
                </View>
                <Text style={styles.expDate}>&gt; {proj.techStack}</Text>
                <Text style={styles.paragraph}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.devColSide}>
        {data.education.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { borderBottomStyle: 'dashed' }]}>Education</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{edu.degree}</Text>
                <Text style={styles.paragraph}>{edu.school}</Text>
                <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {data.certifications.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { borderBottomStyle: 'dashed' }]}>Certs</Text>
            {data.certifications.map(cert => (
              <View key={cert.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{cert.name}</Text>
                <Text style={styles.paragraph}>{cert.issuer}</Text>
                <Text style={styles.expDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  </Page>
);

const ResumeDocument = ({ data }: { data: ResumeData }) => (
  <Document title={data.personalInfo.name + ' - Resume'}>
    {data.template === 'classic' && <ClassicTemplate data={data} />}
    {data.template === 'professional' && <ProfessionalTemplate data={data} />}
    {data.template === 'developer' && <DeveloperTemplate data={data} />}
  </Document>
);

export function DownloadResumeButton() {
  const { data } = useResume();

  return (
    <PDFDownloadLink document={<ResumeDocument data={data} />} fileName="Resume.pdf">
      {({ loading }) => (
        <Button variant="default" className="font-medium min-w-[160px]" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Generating...</span>
          ) : (
            <span className="flex items-center gap-2"><Download size={16} /> Download ATS PDF</span>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
