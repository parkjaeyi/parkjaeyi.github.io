//BACKCULLING COMPLETE
//BACKCULLING COMPLETE
//BACKCULLING COMPLETE
//BACKCULLING COMPLETE

#include<stdio.h>  //includes info about standard library
#include <stdlib.h> // malloc is part of this library
#include <io.h>
#include<windows.h>
#include <SDL.h>
#include <stdbool.h>
#include <stdint.h>
#include "vector.h"
#include "mesh.h"
#include "matrix.h"
#include "triangle.h"


#define FPS 30 //we want 30 fps
#define Frame_target_time  (1000/FPS) //we need to calc milsec how long the frames will last
int prev_frame_time = 0;

SDL_Window* window;
SDL_Renderer* renderer;
SDL_Texture* texture = NULL;
bool is_running = false;
uint32_t* color_buffer = NULL;



int window_width = 800;
int window_height = 600;
bool inFront;

bool initialize_windowing_system();
void setup_memory_buffer();
void process_keyboard_input();
void run_render_pipline();
void cleanup_windowing_system();
void update_state();
void clear_color_buffer(color);
void DrawGrid(uint32_t color);
void DrawRect(int x, int y, int width, int height, uint32_t color);
void DrawTri(int x0, int y0, int x1, int y1, int x2, int y2, uint32_t color);
void Drawdots();
void Drawline(int x0, int y0, int x1, int y1, uint32_t color);
void Drawpixels(int x, int y, uint32_t color);


// declare 2 arrays

vec3_t cube_model[N_MESH_VERTICES];
vec2_t projected_points[N_MESH_VERTICES];

int scaling_factor = 300;
vec2_t orthographic_project_point(vec3_t point_3d);
vec2_t perspective_project_point(vec3_t point_3d);
void build_cube_model();
void project_model();
void scale_shape();

float* depth_buffer = NULL;

//vec3_t camera_position = { 0,0,-5 };
vec3_t cube_rotation = { .x = 0,.y = 0,.z = 0 };

//triangle_t triangles_to_render[N_MESH_FACES];


//vec2_t victor;
//vec2_t* L = &victor;
//void normalize(vec2_t * v); tells us the address of the variable. if we just pass in just the victor, you would be passing the value and it would not keep any changes
//normalize(&victor)

vec3_t camera_position = { 0, 0, 0 };
int t_cnt = 0;
triangle_t triangles_to_render[1000];


int main(void)
{
	is_running = initialize_windowing_system();
	if (!is_running) {
		return -1;  //Exit if initialization fails
	}
	setup_memory_buffer();


	if (!color_buffer) {
		fprintf(stderr, "Memory allocation failed");
		cleanup_windowing_system();
		return -1; // Exit if memory allocation fails
	}
	while (is_running) {
		process_keyboard_input();
		update_state();
		run_render_pipline();

	}

	//gets rid of the memory that you have called
	cleanup_windowing_system();
	return 0;
}

void update_state() {

	clear_color_buffer(0x000000);
	//add more zeros to slow it down
	cube_rotation.x += 0.001;
	cube_rotation.y += 0.001;
	cube_rotation.z += 0.001;

	project_model();

	/* RENDERING 2D */
	// Iterate through your global array of triangles to render. and draw them

	for (int i = 0; i <t_cnt; i++) {
		triangle_t triangle = triangles_to_render[i];
		DrawRect(triangle.points[0].x, triangle.points[0].y, 5, 5, 0xFF00FF00);
		DrawRect(triangle.points[1].x, triangle.points[1].y, 5, 5, 0xFF00FF00);
		DrawRect(triangle.points[2].x, triangle.points[2].y, 5, 5, 0xFF00FF00);
		// Draw lines for each triangle
		DrawTri(
			triangle.points[0].x, triangle.points[0].y,
			triangle.points[1].x, triangle.points[1].y,
			triangle.points[2].x, triangle.points[2].y,
			0x05F8EC
		);
	}
	t_cnt = 0;


	int time_to_wait = Frame_target_time - (SDL_GetTicks() - prev_frame_time);

	if (time_to_wait > 0 && time_to_wait <= Frame_target_time) {
		SDL_Delay(time_to_wait);
	}
}


bool initialize_windowing_system() {

	if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
		fprintf(stderr, "SDLIntFailed");
		return false;
	}
	/*SDL_DisplayMode displaymode;
	SDL_GetCurrentDisplayMode(0, &displaymode);
	window_width = displaymode.w;
	window_height = displaymode.h;*/


	window = SDL_CreateWindow(NULL, SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, window_width, window_height, 0); // to put it in fullscreen:SDL_WINDOW_FULLSCREEN 

	if (!window) {
		fprintf(stderr, "CreateWindowFailed");
		return false;
	}

	renderer = SDL_CreateRenderer(window, -1, 0);

	if (!renderer) {
		fprintf(stderr, "CreateRendererFailed");
		return false;
	}
	return true;
}

void process_keyboard_input() {
	//need to declare SDL_event
	SDL_Event event;
	SDL_PollEvent(&event);
	switch (event.type) {
	case SDL_QUIT:
		is_running = false;
		break;

	case SDL_KEYDOWN:
		if (event.key.keysym.sym == SDLK_ESCAPE) {
			is_running = false;
		}
		break;
	}

}

void run_render_pipline() {

	SDL_UpdateTexture(texture, NULL, color_buffer, (int)(window_width * sizeof(uint32_t)));
	SDL_RenderCopy(renderer, texture, NULL, NULL);
	SDL_RenderPresent(renderer);

}


void cleanup_windowing_system() {
	free(color_buffer);
	free(depth_buffer);
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
	SDL_Quit();
}
void setup_memory_buffer() {
	color_buffer = (uint32_t*)malloc(window_width * window_height * sizeof(uint32_t));
	depth_buffer = (float*)malloc(window_width * window_height * sizeof(float));
	if (!color_buffer) {
		fprintf(stderr, "Memory allocation failed");
		exit(EXIT_FAILURE);
	}

	texture = SDL_CreateTexture(renderer, SDL_PIXELFORMAT_ARGB8888, SDL_TEXTUREACCESS_STREAMING, window_width, window_height);


}

void clear_color_buffer(uint32_t color) {
	for (int y = 0; y < window_height; y++) {
		for (int x = 0; x < window_width; x++) {
			color_buffer[(y * window_width) + x] = color;
		}
	}
}

void DrawGrid(uint32_t color) {
	uint32_t gridColor = color; // White color for the grid lines

//	 Draw horizontal lines
	for (int y = 0; y < window_height; y += 80) {
		for (int x = 0; x < window_width; x++) {
			color_buffer[(y * window_width) + x] = gridColor;
		}
	}

	// Draw vertical lines
	for (int x = 0; x < window_width; x += 80) {
		for (int y = 0; y < window_height; y++) {
			color_buffer[(y * window_width) + x] = gridColor;
		}
	}
}

void DrawRect(int x, int y, int width, int height, uint32_t color) {




	for (int yPos = y; yPos < y + height; yPos++) {
		for (int xPos = x; xPos < x + width; xPos++) {
			color_buffer[(yPos * window_width) + xPos] = color;
		}
	}


}
void Drawdots() {
	int space = 0;
	for (int y = 0; y < window_height; y += 5) {
		for (int x = 0; x < window_width; x += 5) {
			color_buffer[(y * window_width) + x] = 0x0FF00000;

			if (space == 5)
				space = 0;
			else
				space++;
			x += 10;
		}
		y += 10;

	}
}


//a geometric model of a cube, create point and add to array of points
void build_cube_model() {
	int point_count = 0;
	for (float x = -1; x <= 1; x += 0.25) {
		for (float y = -1; y <= 1; y += 0.25) {
			for (float z = -1; z <= 1; z += 0.25) {
				vec3_t new_point = { .x = x, .y = y, .z = z };
				cube_model[point_count++] = new_point;
			}
		}
	}

}

//this function converts a 3d vector to 2d by droping the z paramater
vec2_t orthographic_project_point(vec3_t point_3d)
{
	vec2_t projected_point = { .x = point_3d.x,point_3d.y };
	return projected_point;
}

vec2_t perspective_project_point(vec3_t point_3d)
{
	float adjusted_scaling_factor = 200 / point_3d.z;
	vec2_t projected_point = {
		.x = adjusted_scaling_factor * point_3d.x,
		.y = adjusted_scaling_factor * point_3d.y
	};
	return projected_point;
}


void project_model()
{
	for (int i = 0; i < N_MESH_FACES; i++) {
		face_t mesh_face = mesh_faces[i];
		vec3_t face_vertices[3];

		// Retrieve vertices for the face
		face_vertices[0] = mesh_vertices[mesh_face.a - 1];
		face_vertices[1] = mesh_vertices[mesh_face.b - 1];
		face_vertices[2] = mesh_vertices[mesh_face.c - 1];

		vec3_t transformed_vertices[3];

		/* TRANSFORMATION */
		// Apply transformations to each vertex of the current face
		for (int j = 0; j < 3; j++) {
			vec3_t transformed_vertex = face_vertices[j];

			// Apply rotations
			transformed_vertex = vec3_rotate_x(transformed_vertex, cube_rotation.x);
			transformed_vertex = vec3_rotate_y(transformed_vertex, cube_rotation.y);
			transformed_vertex = vec3_rotate_z(transformed_vertex, cube_rotation.z);

			// Translate the vertex away from the camera
			transformed_vertex.z += 5;

			// Save transformed vertex in an array of transformed vertices
			transformed_vertices[j] = transformed_vertex;
		}

		/* BACKFACE CULLING */
		vec3_t vertex_a = transformed_vertices[0]; /*    A    */
		vec3_t vertex_b = transformed_vertices[1]; /*   / \   */
		vec3_t vertex_c = transformed_vertices[2]; /*  C---B  */

		// Get the vector subtractiono of B-A and C-A
		vec3_t vector_ab = vec3_sub(vertex_b, vertex_a);
		vec3_t vector_ac = vec3_sub(vertex_c, vertex_a);

		// Compute the face normal (using corss product to find perpendiculiar vector)
		vec3_t normal = vec3_cross(vector_ab, vector_ac);

		// Calculate the vector from a vertex to the camera position
		vec3_t camera_ray = vec3_sub(camera_position, vertex_a);

		// Calculate the dot product of the normal vector and the camera ray
		float dot_normal_camera = vec3_dot(camera_ray, normal);

		// If the dot product is negative, the triangle is facing away from the camera
		if (dot_normal_camera < 0) {
			continue; // Skip rendering this triangle
		}

		/* PROJECTION */
		triangle_t projected_triangle;

		// Project the vertices of the current face
		for (int j = 0; j < 3; j++) {
			vec2_t projected_point = perspective_project_point(transformed_vertices[j]);

			/* Translate projected vertex to center of screen */
			projected_point.x += (window_width / 2);
			projected_point.y += (window_height / 2);

			projected_triangle.points[j] = projected_point;
		}

		// Save the projected triangle
		triangles_to_render[t_cnt++] = projected_triangle;
	}
}

//void project_model()
//{
//
//
//	for (int i = 0; i < N_MESH_FACES; i++) {
//		face_t mesh_face = mesh_faces[i];
//		vec3_t face_vertices[3];
//
//		// Retrieve vertices for the face
//		face_vertices[0] = mesh_vertices[mesh_face.a - 1];
//		face_vertices[1] = mesh_vertices[mesh_face.b - 1];
//		face_vertices[2] = mesh_vertices[mesh_face.c - 1];
//
//		vec3_t transformed_vertices[3];
//
//		/* TRANSFORMAION */
//		// Sub Loop, apply transformations to each vertex of the current face
//		for (int j = 0; j < 3; j++) {
//			vec3_t transformed_vertex = face_vertices[j];
//
//			transformed_vertex = vec3_rotate_x(transformed_vertex, cube_rotation.x);
//			transformed_vertex = vec3_rotate_y(transformed_vertex, cube_rotation.y);
//			transformed_vertex = vec3_rotate_z(transformed_vertex, cube_rotation.z);
//
//			//translate the vertex away from the camera
//			transformed_vertex.z + 5;
//
//			//save transformed vertex in an array of transformed vertices 
//			transformed_vertices[j] = transformed_vertex;
//		}
//
//		/* BACKFACE CULLING  */
//		vec3_t vertex_a = transformed_vertices[0]; /*    A    */
//		vec3_t vertex_b = transformed_vertices[1]; /*   / \   */
//		vec3_t vertex_c = transformed_vertices[2]; /*  C---B  */
//
//		// Get the vector subtractiono of B-A and C-A
//		vec3_t vector_ab = vec3_sub(vertex_b, vertex_a);
//		vec3_t vector_ac = vec3_sub(vertex_c, vertex_a);
//
//		// Compute the face normal (using corss product to find perpendiculiar vector)
//		vec3_t normal = vec3_cross(vector_ab, vector_ac);
//
//		// Find the vector between a point in the triangle and the camera origin.
//		vec3_t camera_ray = vec3_sub(camera_position, vertex_a);
//
//		// Calculate how aligned the camera ray is with the face normal (using the dot product)
//		float dot_normal_camera = vec3_dot(camera_ray, normal);
//
//		// Bypass triangles that are looking away from the camera by continuing to next face
//		// in main loop
//		if (dot_normal_camera < 0) {
//			continue;
//		}
//
//
//		/* PROJECTION */
//
//		triangle_t projected_triangle;
//
//		// Sub Loop, project the vertices of curent face
//		for (int j = 0; j < 3; j++) {
//			vec2_t projected_point = perspective_project_point(transformed_vertices[j]);
//
//			/* translate projected vertex to center of screen */
//			projected_point.x += (window_width / 2);
//			projected_point.y += (window_height / 2);
//
//			projected_triangle.points[j] = projected_point;
//		}
//		//save the projected triangle
//		triangles_to_render[t_cnt++] = projected_triangle;
//	}
//
//
//
//}

		

	




void DrawTri(int x0, int y0, int x1, int y1, int x2, int y2, uint32_t color)
{
	Drawline(x0, y0, x1, y1, color); //connects triangle sideways
	Drawline(x1, y1, x2, y2, color);  //draws the bottom but leaves top open
	Drawline(x2, y2, x0, y0, color); //draws the triangles and connects from top to bottom

}




void Drawline(int x0, int y0, int x1, int y1, uint32_t color)
{
	
	int dx = abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	int dy = -abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	int err = dx + dy, e2; /* error value e_xy */

	for (;;) {  /* loop */
		Drawpixels(x0, y0, 0xFFFFFFFF);
		if (x0 == x1 && y0 == y1) {
			break;
		}
		e2 = 2 * err;
		if (e2 >= dy) { err += dy; x0 += sx; } /* e_xy+e_x > 0 */
		if (e2 <= dx) { err += dx; y0 += sy; } /* e_xy+e_y < 0 */
	}
}

void Drawpixels(int x, int y, uint32_t color)
{
	if (x >= 0 && x < window_width && y >= 0 && y < window_height) {
		color_buffer[y * window_width + x] = color;
	}
}

void scale_shape(int scale)
{
	//int scaling_factor = scale;
	for (int i = 0; i < N_MESH_VERTICES; i++) {
		projected_points[i].x *= scale;
		projected_points[i].y *= scale;


	}

}
