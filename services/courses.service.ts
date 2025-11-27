import { apiClient } from "@/lib/api-client";

export interface Course {
    id?: string; // Added for frontend convenience
    _id: string;
    title: string;
    slug: string;
    description: string;
    excerpt?: string;
    content?: string;
    thumbnail?: string;
    instructor: {
        _id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        avatar?: string;
    } | string;
    categories?: string[];
    level: "beginner" | "intermediate" | "advanced" | "expert";
    type: "theoretical" | "practical" | "simulator" | "combined";
    price: number;
    duration?: number;
    durationHours?: number;
    maxStudents?: number;
    studentCount?: number;
    enrollmentCount?: number; // Added for sales progress tracking
    rating?: number;
    reviewCount?: number;
    totalRatings?: number; // Added for ratings display
    completionRate?: number;
    isPublished?: boolean;
    isFeatured?: boolean;
    status?: "published" | "draft" | "archived";
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
    videoUrl?: string;
    language?: string;
    certificateAvailable?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCourseDto {
    title: string;
    slug?: string;
    description: string;
    excerpt?: string;
    content?: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
    type: "theoretical" | "practical" | "simulator" | "combined";
    price: number;
    duration?: number;
    durationHours?: number;
    maxStudents: number;
    thumbnail?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    tags?: string[];
    categories?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
    instructor?: string;
    videoUrl?: string;
    language?: string;
    certificateAvailable?: boolean;
    difficultyLevel?: string;
}

export type UpdateCourseDto = Partial<CreateCourseDto>

class CoursesService {
    async getAllCourses(params: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        level?: string;
        isPublished?: boolean;
    } = {}) {
        try {
            const { data } = await apiClient.get("/courses", { params });
            return data;
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            throw error;
        }
    }

    async getCourseById(id: string) {
        try {
            const { data } = await apiClient.get(`/courses/${id}`);
            return data;
        } catch (error) {
            console.error(`Failed to fetch course ${id}:`, error);
            throw error;
        }
    }

    async createCourse(courseData: CreateCourseDto) {
        try {
            const { data } = await apiClient.post("/courses", courseData);
            return data;
        } catch (error) {
            console.error("Failed to create course:", error);
            throw error;
        }
    }

    async updateCourse(id: string, courseData: UpdateCourseDto) {
        try {
            const { data } = await apiClient.put(`/courses/${id}`, courseData);
            return data;
        } catch (error) {
            console.error(`Failed to update course ${id}:`, error);
            throw error;
        }
    }

    async deleteCourse(id: string) {
        try {
            await apiClient.delete(`/courses/${id}`);
        } catch (error) {
            console.error(`Failed to delete course ${id}:`, error);
            throw error;
        }
    }

    async publishCourse(id: string) {
        try {
            const { data } = await apiClient.patch(`/courses/${id}/publish`);
            return data;
        } catch (error) {
            console.error(`Failed to publish course ${id}:`, error);
            throw error;
        }
    }

    async unpublishCourse(id: string) {
        try {
            const { data } = await apiClient.patch(`/courses/${id}/unpublish`);
            return data;
        } catch (error) {
            console.error(`Failed to unpublish course ${id}:`, error);
            throw error;
        }
    }

    async duplicateCourse(id: string) {
        try {
            const { data } = await apiClient.post(`/courses/${id}/duplicate`);
            return data;
        } catch (error) {
            console.error(`Failed to duplicate course ${id}:`, error);
            throw error;
        }
    }
}

export const coursesService = new CoursesService();
export default coursesService;
