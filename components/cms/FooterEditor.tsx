"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  Settings,
  MoveUp,
  MoveDown,
} from "lucide-react";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialMediaLink {
  platform: string;
  icon: string;
  href: string;
  label: string;
}

interface FooterData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  socialMedia: {
    title: string;
    links: SocialMediaLink[];
  };
  sections: FooterSection[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  bottomLinks: FooterLink[];
  languageSelector: {
    currentLanguage: string;
    languages: { code: string; name: string }[];
  };
}

interface FooterEditorProps {
  initialData?: Partial<FooterData>;
  onSave?: (data: FooterData) => void;
  onPreview?: () => void;
}

const defaultFooterData: FooterData = {
  logo: {
    src: "/footer-logo.webp",
    alt: "Personal Wings Logo",
    width: 140,
    height: 50,
  },
  socialMedia: {
    title: "Follow us on social media",
    links: [
      {
        platform: "facebook",
        icon: "Facebook",
        href: "https://facebook.com",
        label: "Follow us on Facebook",
      },
      {
        platform: "twitter",
        icon: "Twitter",
        href: "https://twitter.com",
        label: "Follow us on Twitter",
      },
      {
        platform: "instagram",
        icon: "Instagram",
        href: "https://instagram.com",
        label: "Follow us on Instagram",
      },
      {
        platform: "linkedin",
        icon: "Linkedin",
        href: "https://linkedin.com",
        label: "Follow us on LinkedIn",
      },
    ],
  },
  sections: [
    {
      title: "LEARNING",
      links: [
        { label: "All Courses", href: "/course" },
        { label: "Lessons", href: "/lesson" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      title: "SHOP",
      links: [
        { label: "Browse Shop", href: "/shop" },
        { label: "My Wishlist", href: "/dashboard/wishlist" },
        { label: "Order History", href: "/dashboard/order-history" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
    {
      title: "MY ACCOUNT",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Enrolled Courses", href: "/dashboard/enrolled-courses" },
        { label: "Reviews", href: "/dashboard/reviews" },
        { label: "Settings", href: "/dashboard/settings" },
      ],
    },
  ],
  newsletter: {
    title: "GET IN TOUCH",
    description: "We don't send spam so don't worry.",
    placeholder: "Email...",
    buttonText: "Subscribe",
  },
  bottomLinks: [
    { label: "FAQs", href: "/faqs" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
  languageSelector: {
    currentLanguage: "English",
    languages: [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
      { code: "es", name: "Español" },
      { code: "de", name: "Deutsch" },
    ],
  },
};

export function FooterEditor({
  initialData,
  onSave,
  onPreview,
}: FooterEditorProps) {
  const [footerData, setFooterData] = useState<FooterData>({
    ...defaultFooterData,
    ...initialData,
  });
  const [activeTab, setActiveTab] = useState("sections");

  const updateNestedValue = (path: string[], value: unknown) => {
    setFooterData((prev) => {
      const newData: FooterData = { ...prev };
      let current: unknown = newData as unknown;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof current === "object" && current !== null) {
          const obj = current as Record<string, unknown>;
          current = obj[key];
        }
      }

      const lastKey = path[path.length - 1];
      if (typeof current === "object" && current !== null) {
        (current as Record<string, unknown>)[lastKey] = value;
      }
      return newData;
    });
  };

  const addSection = () => {
    setFooterData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "NEW SECTION",
          links: [{ label: "New Link", href: "/" }],
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === footerData.sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newSections = [...footerData.sections];
    [newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ];

    setFooterData((prev) => ({ ...prev, sections: newSections }));
  };

  const addLinkToSection = (sectionIndex: number) => {
    setFooterData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].links.push({
        label: "New Link",
        href: "/",
      });
      return { ...prev, sections: newSections };
    });
  };

  const removeLinkFromSection = (sectionIndex: number, linkIndex: number) => {
    setFooterData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].links = newSections[sectionIndex].links.filter(
        (_, i) => i !== linkIndex
      );
      return { ...prev, sections: newSections };
    });
  };

  const addSocialLink = () => {
    setFooterData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        links: [
          ...prev.socialMedia.links,
          {
            platform: "new-platform",
            icon: "Link",
            href: "https://example.com",
            label: "Follow us on New Platform",
          },
        ],
      },
    }));
  };

  const removeSocialLink = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        links: prev.socialMedia.links.filter((_, i) => i !== index),
      },
    }));
  };

  const addBottomLink = () => {
    setFooterData((prev) => ({
      ...prev,
      bottomLinks: [...prev.bottomLinks, { label: "New Link", href: "/" }],
    }));
  };

  const removeBottomLink = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      bottomLinks: prev.bottomLinks.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = () => {
    setFooterData((prev) => ({
      ...prev,
      languageSelector: {
        ...prev.languageSelector,
        languages: [
          ...prev.languageSelector.languages,
          { code: "new", name: "New Language" },
        ],
      },
    }));
  };

  const removeLanguage = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      languageSelector: {
        ...prev.languageSelector,
        languages: prev.languageSelector.languages.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Footer Editor</h2>
          <p className="text-gray-600">
            Customize your footer content and layout
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={() => onSave?.(footerData)}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Sections Tab */}
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Footer Sections</CardTitle>
              <CardDescription>
                Manage the sections and links in your footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <Label>Footer Sections ({footerData.sections.length})</Label>
                <Button onClick={addSection} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>

              {footerData.sections.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateNestedValue(
                            ["sections", sectionIndex.toString(), "title"],
                            e.target.value
                          )
                        }
                        placeholder="Section Title"
                        className="font-semibold"
                      />
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(sectionIndex, "up")}
                          disabled={sectionIndex === 0}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(sectionIndex, "down")}
                          disabled={
                            sectionIndex === footerData.sections.length - 1
                          }
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection(sectionIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Links ({section.links.length})</Label>
                    {section.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex gap-2 items-start">
                        <Input
                          value={link.label}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "sections",
                                sectionIndex.toString(),
                                "links",
                                linkIndex.toString(),
                                "label",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="Link Label"
                          className="flex-1"
                        />
                        <Input
                          value={link.href}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "sections",
                                sectionIndex.toString(),
                                "links",
                                linkIndex.toString(),
                                "href",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="/path"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            removeLinkFromSection(sectionIndex, linkIndex)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addLinkToSection(sectionIndex)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logo Tab */}
        <TabsContent value="logo">
          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>
                Configure your footer logo and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo Source</Label>
                  <Input
                    value={footerData.logo.src}
                    onChange={(e) =>
                      updateNestedValue(["logo", "src"], e.target.value)
                    }
                    placeholder="/path/to/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alt Text</Label>
                  <Input
                    value={footerData.logo.alt}
                    onChange={(e) =>
                      updateNestedValue(["logo", "alt"], e.target.value)
                    }
                    placeholder="Logo alt text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={footerData.logo.width}
                    onChange={(e) =>
                      updateNestedValue(
                        ["logo", "width"],
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={footerData.logo.height}
                    onChange={(e) =>
                      updateNestedValue(
                        ["logo", "height"],
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Manage your social media profiles and links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Social Media Section Title</Label>
                <Input
                  value={footerData.socialMedia.title}
                  onChange={(e) =>
                    updateNestedValue(["socialMedia", "title"], e.target.value)
                  }
                  placeholder="Follow us on social media"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>
                    Social Links ({footerData.socialMedia.links.length})
                  </Label>
                  <Button onClick={addSocialLink} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>

                {footerData.socialMedia.links.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Input
                          value={link.platform}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "socialMedia",
                                "links",
                                index.toString(),
                                "platform",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="facebook"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon Name</Label>
                        <Input
                          value={link.icon}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "socialMedia",
                                "links",
                                index.toString(),
                                "icon",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="Facebook"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.href}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "socialMedia",
                                "links",
                                index.toString(),
                                "href",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Accessibility Label</Label>
                        <Input
                          value={link.label}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "socialMedia",
                                "links",
                                index.toString(),
                                "label",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="Follow us on Facebook"
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSocialLink(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Link
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Newsletter Tab */}
        <TabsContent value="newsletter">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Settings</CardTitle>
              <CardDescription>
                Configure your newsletter subscription section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={footerData.newsletter.title}
                  onChange={(e) =>
                    updateNestedValue(["newsletter", "title"], e.target.value)
                  }
                  placeholder="GET IN TOUCH"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={footerData.newsletter.description}
                  onChange={(e) =>
                    updateNestedValue(
                      ["newsletter", "description"],
                      e.target.value
                    )
                  }
                  placeholder="We don't send spam so don't worry."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Placeholder Text</Label>
                  <Input
                    value={footerData.newsletter.placeholder}
                    onChange={(e) =>
                      updateNestedValue(
                        ["newsletter", "placeholder"],
                        e.target.value
                      )
                    }
                    placeholder="Email..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={footerData.newsletter.buttonText}
                    onChange={(e) =>
                      updateNestedValue(
                        ["newsletter", "buttonText"],
                        e.target.value
                      )
                    }
                    placeholder="Subscribe"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced">
          <div className="grid gap-6">
            {/* Bottom Links */}
            <Card>
              <CardHeader>
                <CardTitle>Bottom Links</CardTitle>
                <CardDescription>
                  Legal and additional links at the bottom of the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Bottom Links ({footerData.bottomLinks.length})</Label>
                  <Button onClick={addBottomLink} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                {footerData.bottomLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={link.label}
                      onChange={(e) =>
                        updateNestedValue(
                          ["bottomLinks", index.toString(), "label"],
                          e.target.value
                        )
                      }
                      placeholder="Link Label"
                      className="flex-1"
                    />
                    <Input
                      value={link.href}
                      onChange={(e) =>
                        updateNestedValue(
                          ["bottomLinks", index.toString(), "href"],
                          e.target.value
                        )
                      }
                      placeholder="/path"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeBottomLink(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Language Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Language Selector</CardTitle>
                <CardDescription>
                  Configure available languages for the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Language</Label>
                  <Input
                    value={footerData.languageSelector.currentLanguage}
                    onChange={(e) =>
                      updateNestedValue(
                        ["languageSelector", "currentLanguage"],
                        e.target.value
                      )
                    }
                    placeholder="English"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>
                      Available Languages (
                      {footerData.languageSelector.languages.length})
                    </Label>
                    <Button onClick={addLanguage} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Language
                    </Button>
                  </div>

                  {footerData.languageSelector.languages.map(
                    (language, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={language.code}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "languageSelector",
                                "languages",
                                index.toString(),
                                "code",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="en"
                          className="w-20"
                        />
                        <Input
                          value={language.name}
                          onChange={(e) =>
                            updateNestedValue(
                              [
                                "languageSelector",
                                "languages",
                                index.toString(),
                                "name",
                              ],
                              e.target.value
                            )
                          }
                          placeholder="English"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeLanguage(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
