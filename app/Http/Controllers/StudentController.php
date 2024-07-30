<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\StudentResource;
use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('student_access');

        $students = Student::search($request)->paginate(10);

        return inertia('Student/Index', [
            'students' => StudentResource::collection($students),
            'classes' => ClassResource::collection(Classes::all()),
            'class_id' => $request->class_id ?? '',
            'search' => $request->search ?? '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('student_create');

        $classes = ClassResource::collection(Classes::all());

        return inertia('Student/Create', [
            'classes' => $classes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        Gate::authorize('student_create');
        Student::create($request->validated());
        return redirect()->route('students.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        Gate::authorize('student_edit');
        $classes = ClassResource::collection(Classes::all());

        $previousUrl = URL::previous();
        $parseUrl = parse_url($previousUrl);
        $query = $parseUrl['query'] ?? '';
        parse_str($query, $params);
        $page = $params['page'] ?? 1;

        Session::put('page', $page);

        return inertia('Student/Edit', [
            'classes' => $classes,
            'student' => StudentResource::make($student)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        Gate::authorize('student_edit');
        $student->update($request->validated());

        $previousUrl = Session::get('page');
        return redirect()->route('students.index', ['page' => $previousUrl]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        Gate::authorize('student_delete');
        $student->delete();
        return redirect()->back();
    }
}
