import glob, re
repls = {
 'About.jsx': ('<p className="text-sm text-gray-500">Home / About</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">About Avenor</p>'),
 'Departments.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Departments</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Our Specialties</p>'),
 'Doctors.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Doctors</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Meet Our Doctors</p>'),
 'Services.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Services</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Exceptional Care</p>'),
 'Facilities.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Facilities</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Our Facilities</p>'),
 'Contact.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Contact</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">We\'re Here to Help</p>'),
 'BookAppointment.jsx': ('<p className="text-[#F4BE65] text-sm mb-2">Home / Book Appointment</p>', '<p className="text-[#DFAF55] uppercase tracking-widest text-sm font-semibold mb-2">Appointment Request</p>'),
}
for f, (old,new) in repls.items():
    s=open(f).read()
    if old in s:
        s=s.replace(old,new)
        open(f,'w').write(s)
        print('updated',f)
    else:
        print('not found',f)
EOF
