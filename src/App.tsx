import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainContent from './compos/MainContent';
import TechnologiesSection from './compos/skill';
import GeneralSkillsSection from './compos/Data';
import WorkEducation from './compos/education';
import Resume from './compos/Resume';
import ResumeSingle from './compos/ResumeSingle';
import BlogSection from './compos/blogTech';
import BlogSingle from './compos/BlogSingle';
import ProjectsSection from './compos/Projects';
import ProjectSingle from './compos/ProjectSingle';
import Testimonials from './compos/testimonial';
import ContactSection from './compos/contact';
import AdminLogin from './compos/admin/AdminLogin';
import AdminDashboard from './compos/admin/AdminDashboard';
import ProtectedRoute from './compos/admin/ProtectedRoute';

const ROLES = ['CHUKWUDI VINCENT', 'A Data Scientist', 'A FullStack Developer', 'A Graphic Designer'];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index              element={<MainContent lines={ROLES} />} />
          <Route path="skills"      element={<TechnologiesSection />} />
          <Route path="works"       element={<GeneralSkillsSection />} />
          <Route path="education"   element={<WorkEducation />} />
          <Route path="resume"      element={<Resume />} />
          <Route path="resume/view" element={<ResumeSingle />} />
          <Route path="blog"        element={<BlogSection />} />
          <Route path="blog/:slug"  element={<BlogSingle />} />
          <Route path="projects"    element={<ProjectsSection />} />
          <Route path="projects/:slug" element={<ProjectSingle />} />
          <Route path="testimonials"   element={<Testimonials />} />
          <Route path="contact"        element={<ContactSection />} />
        </Route>
        <Route path="/admin"           element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
