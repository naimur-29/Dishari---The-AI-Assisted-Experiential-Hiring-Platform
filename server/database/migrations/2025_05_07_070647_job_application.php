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
        //
        Schema::create('job_applications', function(Blueprint $table){
            $table->id();
            $table->integer('job_id');
            $table->text('link')->nullable();
            $table->text('explanation')->nullable();
            $table->text('images');
            $table->json('test_result')->default(null);
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
