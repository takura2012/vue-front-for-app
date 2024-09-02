<script setup></script>

<template>
    <div>
    <input type="checkbox" id="modal-add-check" class="invisible">
        <div class="add-modal-blocker"></div>
        <div class="modal-add-workouts">
            <div class="modal-add-workouts-top">
                <div class="modal-add-workouts-top-text text-36">Add workout</div>
                <div class="modal-add-workouts-top-close">
                    <label for="modal-add-check">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </label>
                </div>
            </div>

            <div class="modal-add-workouts-middle">
                
                <div class="modal-add-workouts-item">
                    <label for="modal-add-check">
                        <div class="modal-add-texts">
                            <div class="modal-add-texts-name text-24 utc-orange">Workout-name something like that</div>
                            <div class="modal-add-texts-count utc-light-gray">Exercises: 5</div>
                            <div class="utc-light-gray">Duration ~ 55 min.</div>
                        </div>
                        <div class="modal-add-workouts-img-group">
                            <div class="modal-add-workouts-img-gradient"></div>
                            <img class="modal-add-workouts-img-src" src="">
                        </div>
                    </label>

                </div>


            </div>
            <div class="modal-add-workouts-bottom"></div>
        </div>
    </div>
</template>

<style></style>