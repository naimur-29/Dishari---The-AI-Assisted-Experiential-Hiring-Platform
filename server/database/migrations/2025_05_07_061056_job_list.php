<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_lists', function(Blueprint $table){
            $table->id();
            $table->integer('inudstry_id');
            $table->text('title');
            $table->text('problem_statement');
            $table->text('evaluation_criteria');
            $table->text('submission_guideline');
            $table->boolean('is_hiring')->default(true);
            $table->date('deadline');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
